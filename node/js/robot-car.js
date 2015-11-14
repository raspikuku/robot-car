/**
 * Created by elkuku on 30.09.15.
 */


$(document).ready(function () {

	KuKuRobot.clear_display();

	$('#robot_connect').click(function () {
		if (KuKuRobot.isConnected()) {
			KuKuRobot.disconnect();

			return false;
		}

		var ip = $('#robot_ip').val();

		if (!ip) {
			alert('Please enter an IP');

			return false;
		}

		KuKuRobot.connect(ip);

		return false;
	});

	$('#poweroff').click(function () {
		KuKuRobot.poweroff();

		return false;
	});

	$('#sld_cam_hor').slider({
		value : 50,
		slide : function (event, ui) {
			KuKuRobot.moveCam('hor', 100 - ui.value)
		},
		change: function (event, ui) {
			KuKuRobot.moveCam('hor', 100 - ui.value)
		}
	}).slider('pips', {
		step: 25,
		rest: 'label'//,
		//labels: ['-90', '-45', '0', '45', '90']
	});

	$('#sld_cam_ver').slider({
		value      : 50,
		orientation: 'vertical',
		slide      : function (event, ui) {
			KuKuRobot.moveCam('ver', 100 - ui.value)
		},
		change     : function (event, ui) {
			KuKuRobot.moveCam('ver', 100 - ui.value)
		}
	}).slider('pips', {
		step: 25,
		rest: 'label'//,
		//labels: ['-90', '-45', '0', '45', '90']
	});






	$('#windrose_rose').click(function () {
		$('#windrose').attr('src', '/img/windrose_kuku3.svg');

	});

	$('#windrose_car').click(function () {
		//$('#windrose').attr('src', '/img/top-car-vector-coloring.svg');
		$('#windrose').attr('src', '/img/car-01-green.svg');

	});








	$('#ping_dist').click(function () {
		$.post('robot.php', {action: 'ping_dist'}, function (data) {
			parseResponse(data);
			data = $.parseJSON(data);
			$('#radar_dist').html(data.performed);
		});
	});

	$('#radar_sweep').click(function () {
		$.post('robot.php', {action: 'radar_sweep'}, function (response) {
			response = parseResponse(response);

			if (response.data) {
				drawRadar(response.data);
			}
		});
	});

	function drawRadar(data) {

		var maxDist = 200;

		//console.log(data);

		var angle, distance, a, b;
		var tf = Math.PI / 180;

		for (var key in data) {
			angle = key / 100 * 180;
			distance = data[key];

			if (distance > maxDist) {
				$('#obj-1-' + key).data('x', 0);
				$('#obj-1-' + key).data('y', 0);
				continue;
			}

			//console.log(angle + '° - ' + distance + ' cm  ');

			a = distance * Math.sin(angle * tf);
			b = distance * Math.cos(angle * tf);

			//console.log(a, b);

			factor = a / maxDist * 160;
			y = 160 - factor;
			factor = b / maxDist * 160;
			x = 160 - factor;
			//console.log(x, y);

			x = 320 - (key / 100 * 320);
			y = 160 - (distance / maxDist * 160);

			$('#obj-1-' + key).data('x', x);
			$('#obj-1-' + key).data('y', y);
		}

		setRadarObjects();

		$('#debugConsole').prepend('<p>radar sweep</p>');

		return;
	}

	function parseResponse(data) {
		data = $.parseJSON(data);

		var d = new Date();
		var time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();

		if (data.performed) {
			$('#debugConsole').prepend('<p>' + time + ' ' + data.performed + '</p>');
		}

		if (data.error) {
			$('#debugConsole').prepend('<p class="error">' + time + ' ' + data.error + '</p>');
		}

		return data;
	}
});


function setRadarObjects() {
	var $obj = $('.obj'),
		rad = 160.5; //   = 321/2

	$obj.each(function () {
		var data = $(this).data(),
			pos = {X: data.x, Y: data.y},
			getAtan = Math.atan2(pos.X - rad, pos.Y - rad),
			getDeg = ~~(-getAtan / (Math.PI / 180) + 180);
		$(this).css({left: pos.X, top: pos.Y}).attr('data-atDeg', getDeg);
	});
}

$(function () {

	var $rad = $('#rad'),
		$obj = $('.obj'),
		deg = 0,
		rad = 160.5; //   = 321/2

	$obj.each(function () {
		var data = $(this).data(),
			pos = {X: data.x, Y: data.y},
			getAtan = Math.atan2(pos.X - rad, pos.Y - rad),
			getDeg = ~~(-getAtan / (Math.PI / 180) + 180);
		$(this).css({left: pos.X, top: pos.Y}).attr('data-atDeg', getDeg);
	});

	(function rotate() {
		$rad.css({transform: 'rotate(' + deg + 'deg)'});
		$('[data-atDeg=' + deg + ']').stop().fadeTo(0, 1).fadeTo(1700, 0.2);

		// LOOP
		setTimeout(function () {
			deg = ++deg % 360;
			/*
			 if (deg == 90) {
			 deg = 270;
			 }
			 */
			rotate();
		}, 10);
	})();
});
