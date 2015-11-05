<?php
/**
 * Created by PhpStorm.
 * User: elkuku
 * Date: 29.09.15
 * Time: 22:01
 */

class Robot
{
	private $pins = [17, 27, 22, 23];

	private $gpioCmd = '/usr/local/bin/gpio -g';

	public $sleepTime = 300000;

	private $initialized = false;

	public $lights = ['1' => 12];

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

	public function rev()
	{
		$this->initMotors()->set([1, 0, 1, 0]);
		//usleep($this->sleepTime);
		//$this->stop();

		return $this;
	}

	public function fwd()
	{
		$this->initMotors()->set([0, 1, 0, 1]);
		//usleep($this->sleepTime);
		//$this->stop();

		return $this;
	}

	function right()
	{
		$this->initMotors()->set([1, 0, 0, 1]);
		//usleep($this->sleepTime);
		//$this->stop();

		return $this;
	}

	function left()
	{
		$this->initMotors()->set([0, 1, 1, 0]);
		//usleep($this->sleepTime);
		//$this->stop();

		return $this;
	}

	function stop()
	{
		$this->initMotors()->set([0, 0, 0, 0]);

		return $this;
	}

	public function camera($direction, $position)
	{
		$dir = ($direction == 'hor') ? 1 : 0;

		$this->servo($dir, $position);

		return $dir . ' / ' . $position;
	}

	public function pingDist()
	{
		return $this->shellExec('sudo /usr/bin/python ../python/disttest.py', true);
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

	private function set($values)
	{
		foreach($this->pins as $i => $pin)
		{
			$this->gpio("write $pin {$values[$i]}");
		}
	}

	private function gpio($command, $expectReturn = false)
	{
		return $this->shellExec($this->gpioCmd . ' ' . $command, $expectReturn);
	}

	private function servo($number, $position)
	{
		$this->shellExec(sprintf(
				'echo %d=%d%% > /dev/servoblaster',
				(int)$number,
				(int)$position
				));

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
}
