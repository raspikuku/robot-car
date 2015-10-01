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

	<div class="row">
		<div class="col-xs-12">
			<img src="http://192.168.0.105:8081/?action=stream" width="320" height="240" />
		</div>
	</div>
	<div class="row">
		<div class="col-xs-6">
			<button class="btn btn-lg btn-block btn-success btn-control" id="fwd">
				<span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span>
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
		</div>
	</div>
</div>
<script src="js/jquery-2.1.4.min.js"></script>
<script>
	$(document).ready(function () {

		$('#fwd').click(function () {
			$.post("robot.php?action=fwd", function (data) {
				parseResponse(data);
			});
		});

		$('#rev').click(function () {
			$.post("robot.php?action=rev", function (data) {
				parseResponse(data);
			});
		});

		$('#left').click(function () {
			$.post("robot.php?action=left", function (data) {
				parseResponse(data);
			});
		});

		$('#right').click(function () {
			$.post("robot.php?action=right", function (data) {
				parseResponse(data);
			});
		});

		function parseResponse(data){
			data = $.parseJSON(data);
			console.log(data);

			if(data.message){
				$('#debugContainer').prepend('<p>' + data.message + '</p>');
			}

			if(data.error){
				$('#debugConsole').prepend('<p class="error">' + data.error + '</p>');
				console.log(data.error);
			}
		}
	});
</script>
</body>
</html>
