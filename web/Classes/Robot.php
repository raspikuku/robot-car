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

	public $sleepTime = 1000000;

	public function __construct()
	{
		foreach($this->pins as $i => $pin)
		{
			$this->gpio("mode {$pin} out");
		}
	}

	public function fwd()
	{
		$this->set([1, 0, 1, 0]);
		usleep($this->sleepTime);
		$this->stop();
	}

	public function rev()
	{
		$this->set([0, 1, 0, 1]);
		usleep($this->sleepTime);
		$this->stop();
	}

	function left()
	{
		$this->set([1, 0, 0, 1]);
		usleep($this->sleepTime);
		$this->stop();
	}

	function right()
	{
		$this->set([0, 1, 1, 0]);
		usleep($this->sleepTime);
		$this->stop();
	}
	function stop()
	{
		$this->set([0, 0, 0, 0]);
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
}