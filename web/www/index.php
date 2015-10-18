<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<title>RobotCar</title>
	<link href="css/bootstrap.min.css" rel="stylesheet">
	<link href="css/jquery-ui.css" rel="stylesheet">
	<link href="css/jquery-ui-slider-pips.css" rel="stylesheet" />
	<link href="css/robot-car.css" rel="stylesheet">
</head>
<body>
<div class="container">
	<h4>RobotCar</h4>

	<div class="row">
		<div class="col-xs-5" id="container_cam">
			<img src="http://<?= $_SERVER['SERVER_ADDR'] ?>:8081/?action=stream" width="320" height="240" />
			<div id="sld_cam_hor"></div>
		</div>
		<div class="col-xs-1">
			<div style="height: 321px;" id="sld_cam_ver"></div>
		</div>
		<div class="col-xs-1">
			<button class="btn btn-default" id="cam_center">Center</button>
			<button class="btn btn-default" id="ping_dist">DPing</button>
			<div id="radar_dist"></div>
		</div>
		<div class="col-xs-5" id="container_radar">
			<div id="radar">
				<div id="rad"></div>

				<div class="obj" data-x="120" data-y="65"></div>
				<div class="obj" data-x="140" data-y="185"></div>
				<div class="obj" data-x="220" data-y="35"></div>
				<div class="obj" data-x="120" data-y="235"></div>

		</div>
		</div>
	</div>
	<div class="row">
		<div class="col-xs-6">
			<button class="btn btn-lg btn-block btn-success btn-control" id="fwd">
				<span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span>
			</button>
			<br />
			<button class="btn btn-lg btn-block btn-inverse btn-control" id="stop">
				<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
			</button>
			<br />
			<button class="btn btn-lg btn-block btn-danger btn-control" id="rev">
				<span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span>
			</button>
		</div>
		<div class="col-xs-6">
			<div class="row">
				<div class="col-xs-6">
					<button class="btn btn-lg btn-block btn-default btn-control" id="left">
						<span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span>
					</button>
				</div>
				<div class="col-xs-6">
					<button class="btn btn-lg btn-block btn-default btn-control" id="right">
						<span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span>
					</button>
				</div>
			</div>
			<div id="debugConsole"></div>
			<button id="clear_console" class="btn btn-default">Clr</button>
			<button class="btn btn-danger" id="poweroff">Power OFF</button>
		</div>
	</div>
</div>
<script src="js/jquery-2.1.4.min.js"></script>
<script src="js/jquery-ui.js"></script>
<script src="js/jquery-ui-slider-pips.js"></script>
<script src="js/robot-car.js"></script>
</body>
</html>
