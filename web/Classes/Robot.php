<?php
/**
 * Created by PhpStorm.
 * User: elkuku
 * Date: 29.09.15
 * Time: 22:01
 */

class Robot
{
	/**
	 * Motor pins
	 * @var array
	 */
	public $pins = [17, 27, 22, 23];

	/**
	 * Light pins
	 * @var array
	 */
	public $lights = ['1' => 12];

	/**
	 * Sleep time in milliseconds.
	 *
	 * If not set command will run without stop()
	 *
	 * @var int
	 */
	private $duration = 0;

	private $gpioCmd = '/usr/local/bin/gpio -g';

	private $initialized = false;

	public function fwd()
	{
		$this->initMotors()
				->set([0, 1, 0, 1])
				->sleep();

		return 'Forward';
	}

	public function rev()
	{
		$this->initMotors()
			->set([1, 0, 1, 0])
			->sleep();

		return 'Reverse';
	}

	function right()
	{
		$this->initMotors()
			->set([1, 0, 0, 1])
			->sleep();

		return 'Right';
	}

	function left()
	{
		$this->initMotors()
			->set([0, 1, 1, 0])
			->sleep();

		return 'Left';
	}

	public function stop()
	{
		$this->initMotors()->set([0, 0, 0, 0]);

		return 'STOP';
	}

	public function camera($direction, $position)
	{
		$dir = ($direction == 'hor') ? 1 : 0;

		$this->servo($dir, $position);

		return $dir . ' / ' . $position;
	}

	public function setLight($num, $status)
	{
		if (false == isset($this->lights[$num]))
		{
			throw new UnexpectedValueException('Invalid light number');
		}

		$status = ($status) ? 1 : 0;

		$this->gpio('mode ' . $this->lights[$num] . ' out');
		$this->gpio('write ' . $this->lights[$num] . ' ' . $status);

		return $status ? 'ON' : 'OFF';
	}

	public function pingDist()
	{
		return $this->shellExec('sudo /usr/bin/python ../python/disttest.py', true);
	}

	public function showClock()
	{
		date_default_timezone_set('America/Guayaquil');

		$h = date('G');
		$m = date('i');

		return $this->shellExec(sprintf('sudo /usr/bin/python ../python/show_time.py %d %d', $h, $m), true);
	}

	public function sweep()
	{
		//$valueString = trim(shell_exec('sudo /usr/bin/python ../python/sweep_radar.py 2>&1'));

		$valueString = $this->shellExec('sudo /usr/bin/python ../python/sweep_radar.py', true);

		/*
		 * alpha = 90° - beta
		 * a = c * cos(beta)
		 * b = sqr(c² - a²)
		 */

		$lines = explode("\n", $valueString);

		$touples = new stdClass;

		foreach($lines as $line)
		{
			$values = explode(' ', $line);

			$touples->$values[0] = $values[1];
		}

		return json_encode($touples);
	}

	public function poweroff()
	{
		return $this->shellExec('sudo poweroff');
	}

	public function status()
	{
		$status = new stdClass;

		$status->feeling = '=;)';

		//$status->bearing = $this->shellExec('sudo python ../python/getbearing.py', true);
		$magnetString = $this->shellExec('sudo python ../python/get_magnet.py', true);

		$parts = explode(',', $magnetString);

		$status->bearing = trim($parts['0']);
		$status->magnet_x = trim($parts['1']);
		$status->magnet_y = trim($parts['2']);
		$status->magnet_z = trim($parts['3']);

		return json_encode($status);
	}

	private function sleep()
	{
		if ($this->duration)
		{
			usleep($this->duration);
			$this->stop();
		}

		return $this;
	}

	private function initMotors()
	{
		if ($this->initialized)
		{
			return $this;
		}

		foreach($this->pins as $i => $pin)
		{
			$this->gpio("mode {$pin} out");
		}

		$this->initialized = true;

		return $this;
	}

	private function set($values)
	{
		foreach($this->pins as $i => $pin)
		{
			$this->gpio("write $pin {$values[$i]}");
		}

		return $this;
	}

	private function gpio($command, $expectReturn = false)
	{
		return $this->shellExec($this->gpioCmd . ' ' . $command, $expectReturn);
	}

	private function servo($number, $position)
	{
		$this->shellExec(
			sprintf(
				'echo %d=%d%% > /dev/servoblaster',
				(int)$number,
				(int)$position
			)
		);

		return $this;
	}

	private function shellExec($command, $expectReturn = false)
	{
		$output = trim(shell_exec($command . ' 2>&1'));

		if ($output && !$expectReturn)
		{
			throw new UnexpectedValueException($output);
		}

		return $output;
	}

	/**
	 * @param int $duration
	 */
	public function setDuration($duration)
	{
		$this->duration = $duration * 1000;
	}
}
