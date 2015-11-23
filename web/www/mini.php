<?php
include '../Classes/Robot.php';

$action = isset($_POST['action']) ? $_POST['action'] : '';

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
			$robot->setDuration(isset($_POST['duration']) ? intval($_POST['duration']) : 0);
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

<form action="mini.php" method="post">

	<?php
	echo $performed;
	echo $error;
	?>

	<input name="duration" value="1" />

	<br />

	<button name="action" value="fwd">Forward</button>
	<button name="action" value="rev">Reverse</button>
	<button name="action" value="left">Left</button>
	<button name="action" value="right">Right</button>
</form>

</body>
</html>
