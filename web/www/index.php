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
			<button class="btn btn-default" id="ping_dist">DPing: <span id="radar_dist"></span></button>

			<button class="btn btn-default" id="radar_sweep">Radar</button>
			<button class="btn btn-default" id="light_1">Light 1:  <span id="light_1_status">OFF</span></button>
			<button class="btn btn-default" id="show_clock">Clock</button>
			<button class="btn btn-default" id="update_status">Status <span id="update_status_status">OFF</span></button>
		</div>
		<div class="col-xs-5" id="container_radar">
			<div id="radar">
				<div id="rad"></div>

				<div id="obj-1-0" class="obj" data-x="0" data-y="0"></div>
				<div id="obj-1-5" class="obj" data-x="0" data-y="0"></div>
				<div id="obj-1-10" class="obj" data-x="0" data-y="0"></div>
				<div id="obj-1-15" class="obj" data-x="0" data-y="0"></div>
				<div id="obj-1-20" class="obj" data-x="0" data-y="0"></div>
				<div id="obj-1-25" class="obj" data-x="0" data-y="0"></div>
				<div id="obj-1-30" class="obj" data-x="0" data-y="0"></div>
				<div id="obj-1-35" class="obj" data-x="0" data-y="0"></div>
				<div id="obj-1-40" class="obj" data-x="0" data-y="0"></div>
				<div id="obj-1-45" class="obj" data-x="0" data-y="0"></div>
				<div id="obj-1-50" class="obj" data-x="0" data-y="0"></div>
				<div id="obj-1-55" class="obj" data-x="0" data-y="0"></div>
				<div id="obj-1-60" class="obj" data-x="0" data-y="0"></div>
				<div id="obj-1-65" class="obj" data-x="0" data-y="0"></div>
				<div id="obj-1-70" class="obj" data-x="0" data-y="0"></div>
				<div id="obj-1-75" class="obj" data-x="0" data-y="0"></div>
				<div id="obj-1-80" class="obj" data-x="0" data-y="0"></div>
				<div id="obj-1-85" class="obj" data-x="0" data-y="0"></div>
				<div id="obj-1-90" class="obj" data-x="0" data-y="0"></div>
				<div id="obj-1-95" class="obj" data-x="0" data-y="0"></div>
				<div id="obj-1-100" class="obj" data-x="0" data-y="0"></div>

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
			<img src="img/windrose_kuku3.svg" id="windrose" width="250" height="250" />
			<span id="bearing">0</span>
			<div id="sld_windrose"></div>

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
<script src="js/jQueryRotate.js"></script>
</body>
</html>
