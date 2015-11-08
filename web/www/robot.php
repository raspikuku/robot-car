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
		case 'fwd' :
		case 'rev' :
		case 'left' :
		case 'right' :
			$robot->$action();
			$response->performed = $action;
		break;

		case 'cam':
			$direction = isset($_POST['direction']) ? $_POST['direction'] : '';
			$position = isset($_POST['position']) ? $_POST['position'] : '';

			$response->performed = $robot->camera($direction, $position);
		break;

		case 'ping_dist':
			$response->performed = $robot->pingDist();
		break;

		case 'status':
			$response->data = $robot->status();
			$response->performed = 'status';
		break;

		case 'radar_sweep':
			$response->performed = 'radar_sweep';
			$response->data = $robot->sweep();
		break;

		case 'show_clock':
			$response->performed = $robot->showClock();
		break;

		case 'light':
			$num = isset($_POST['num']) ? intval($_POST['num']) : 0;
			$status = isset($_POST['status']) ? intval($_POST['status']) : 0;

			$response->performed = $robot->setLight($num, $status);
		break;

		case 'poweroff':
			$robot->poweroff();
			$response->performed = 'POWEROFF';
		break;

		case 'local':
			$string = file_get_contents('/home/elkuku/tests/robovalues.json');
			$response->data = $string;
			$response->performed = 'local';
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
