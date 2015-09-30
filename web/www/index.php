<?php

$action = isset($_POST['action']) ? $_POST['action'] : '';

class Robot
{
	private $pins = [17, 27, 22, 23];
	public $sleepTime = 1000000;

function init()
{
	$ret = trim(shell_exec("/usr/local/bin/gpio -g mode 17 out"));
	$ret = trim(shell_exec("/usr/local/bin/gpio -g mode 27 out"));
	$ret = trim(shell_exec("/usr/local/bin/gpio -g mode 22 out"));
	$ret = trim(shell_exec("/usr/local/bin/gpio -g mode 23 out"));
	return $this;
}

function set($vals)
{
foreach($this->pins as $i => $pin)
{
	$ret = trim(shell_exec("/usr/local/bin/gpio -g write $pin {$vals[$i]} 2>&1"));
}
}

function fwd()
{
	$this->set([1, 0, 1, 0]);
	usleep($this->sleepTime);
	$this->stop();
}

function rev()
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
}

$robot = new Robot();
$robot->init();

switch($action)
{
	case 'fwd' :
		$robot->fwd();
	break;
	case 'rev' :
		$robot->rev();
	break;
	case 'left' :
		$robot->left();
	break;
	case 'right' :
		$robot->right();
	break;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>RobotCar</title>
<link href="bootstrap-3.3.5-dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<div class="container">
<h1>RobotCar</h1>
<div>

<form method="post">



<div class="row">
  <div class="col-xs-6">
<button class="btn btn-lg btn-block btn-success" type="submit" name="action" value="fwd">Fwd</button>
<br />
<button class="btn btn-lg btn-block btn-danger" type="submit" name="action" value="rev">Rev</button>
.col-xs-6
</div>
  <div class="col-xs-6">
<div class="row">
  <div class="col-xs-6">
<button class="btn btn-lg btn-block btn-default" type="submit" name="action" value="left">Left</button>
</div>
  <div class="col-xs-6">
<button class="btn btn-lg btn-block btn-default" type="submit" name="action" value="right">Right</button>
</div>
</div>

</div>
</div>
</form>
</div>
</body>
</html>
