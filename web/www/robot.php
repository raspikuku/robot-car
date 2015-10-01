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
$response->action = '';
$response->error = '';

try
{
	$robot = new Robot;

	switch ($action)
	{
		case 'fwd' :
			$robot->fwd();
			$response->action = 'Forward';
		break;
		case 'rev' :
			$robot->rev();
			$response->action = 'Reverse';
		break;
		case 'left' :
			$robot->left();
			$response->action = 'Left';
		break;
		case 'right' :
			$robot->right();
			$response->action = 'Right';
		break;
		default :
			$response->action = '**UNKNOWN**';
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
