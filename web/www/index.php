<?php

include '../Classes/Robot.php';

$action = isset($_POST['action']) ? $_POST['action'] : '';

try
{
	$robot = new Robot;

	switch ($action)
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
} catch (Exception $exception)
{
	echo $exception->getMessage();
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<title>RobotCar</title>
	<link href="css/bootstrap.min.css" rel="stylesheet">
	<link href="css/robot-car.css" rel="stylesheet">
</head>
<body>
<div class="container">
	<h1>RobotCar</h1>


	<form method="post">

		<div class="row">
			<div class="col-xs-12">
				<img src="http://192.168.0.105:8081/?action=stream" width="320" height="240" />
			</div>
		</div>

		<div class="row">
			<div class="col-xs-6">
				<button class="btn btn-lg btn-block btn-success btn-control" type="submit" name="action" value="fwd">
					<span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span>
				</button>
				<br />
				<button class="btn btn-lg btn-block btn-danger btn-control" type="submit" name="action" value="rev">
					<span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span>
				</button>
			</div>
			<div class="col-xs-6">
				<div class="row">
					<div class="col-xs-6">
						<button class="btn btn-lg btn-block btn-default btn-control" type="submit" name="action" value="left">
							<span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span>
						</button>
					</div>
					<div class="col-xs-6">
						<button class="btn btn-lg btn-block btn-default btn-control" type="submit" name="action" value="right">
							<span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span>
						</button>
					</div>
				</div>
			</div>
		</div>
	</form>
</div>
</body>
</html>
