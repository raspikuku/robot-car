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

	public function __construct()
	{
		foreach($this->pins as $i => $pin)
		{
			$this->gpio("mode {$pin} out");
		}
	}

	public function rev()
	{
		$this->set([1, 0, 1, 0]);
		//usleep($this->sleepTime);
		//$this->stop();
	}

	public function fwd()
	{
		$this->set([0, 1, 0, 1]);
		//usleep($this->sleepTime);
		//$this->stop();
	}

	function right()
	{
		$this->set([1, 0, 0, 1]);
		//usleep($this->sleepTime);
		//$this->stop();
	}

	function left()
	{
		$this->set([0, 1, 1, 0]);
		//usleep($this->sleepTime);
		//$this->stop();
	}

	function stop()
	{
		$this->set([0, 0, 0, 0]);
	}

	public function camera($direction, $position)
	{
		$dir = ($direction == 'hor') ? 1 : 0;

		$this->servo($dir, $position);

		return $dir . ' / ' . $position;
	}

	public function pingDist()
	{
		return trim(shell_exec('sudo /usr/bin/python ../python/disttest.py 2>&1'));
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
		$output = trim(shell_exec($this->gpioCmd . ' ' . $command . ' 2>&1'));

		if ($output && !$expectReturn)
		{
			throw new UnexpectedValueException($output);
		}

		return $output;
	}

	private function servo($number, $position)
	{
		return $this->shellExec(sprintf(
				'echo %d=%d%% > /dev/servoblaster 2>&1',
				(int)$number,
				(int)$position
		));

		$output = trim(shell_exec(sprintf(
				'echo %d=%d%% > /dev/servoblaster 2>&1',
				(int)$number,
				(int)$position
				)));

		if ($output)
		{
			throw new UnexpectedValueException($output);
		}

		return $output;
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
