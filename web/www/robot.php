<?php
/**
 * Created by PhpStorm.
 * User: elkuku
 * Date: 30.09.15
 * Time: 18:42
 */

ob_start();

include '../Classes/Robot.php';

$action = isset($_POST['action']) ? $_POST['action'] : '';

$response = new stdClass;
$response->performed = '';
$response->error = '';

try
{
	$robot = new Robot;

	switch ($action)
	{
		case 'stop' :
			$robot->stop();
			$response->performed = 'STOP';
		break;
		case 'fwd' :
			$robot->fwd();
			$response->performed = 'Forward';
		break;
		case 'rev' :
			$robot->rev();
			$response->performed = 'Reverse';
		break;
		case 'left' :
			$robot->left();
			$response->performed = 'Left';
		break;
		case 'right' :
			$robot->right();
			$response->performed = 'Right';
		break;
		case 'cam':
			$direction = isset($_POST['direction']) ? $_POST['direction'] : '';
			$position = isset($_POST['position']) ? $_POST['position'] : '';

			$response->performed = $robot->camera($direction, $position);
		break;
		case 'ping_dist':
			$response->performed = $robot->pingDist();
		break;
		case 'radar_sweep':
			$response->performed = $robot->sweep();
		break;
		case 'poweroff':
			$robot->poweroff();
			$response->performed = 'POWEROFF';
		break;
		default :
			$response->performed = '**NOTHING**';
		break;
	}
} catch (Exception $exception)
{
	$response->error = $exception->getMessage();
}

$output = ob_get_clean();

if ($output)
{
	$response->error .= $output;
}

echo json_encode($response);
