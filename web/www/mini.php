<?php
include '../Classes/Robot.php';

$action = isset($_POST['action']) ? $_POST['action'] : '';
$duration = isset($_POST['duration']) ? intval($_POST['duration']) : 0;

$performed = '';
$error = '';

try
{
	switch ($action)
	{
		case 'fwd' :
		case 'rev' :
		case 'left' :
		case 'right' :
			$robot = new Robot;
			$robot->setDuration($duration);
			$robot->$action();
			$performed = $action;
			break;
	}
}
catch (Exception $exception)
{
	$error = $exception->getMessage();
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<title>RobotCar</title>
</head>
<body>

<div>
	<?php
	echo $performed;
	echo $error;
	?>
</div>

<form action="mini.php" method="post">

	<input name="duration" value="<?php echo $duration; ?>" />

	<br />

	<button name="action" value="fwd">Forward</button>
	<button name="action" value="rev">Reverse</button>
	<button name="action" value="left">Left</button>
	<button name="action" value="right">Right</button>
</form>

</body>
</html>
