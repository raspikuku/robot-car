/**
 * Created by elkuku on 30.09.15.
 */

$(document).ready(function () {
	$("#fwd").mousedown(function () {
		sendRequest('fwd');
	});

	$('#rev').mousedown(function () {
		sendRequest('rev');
	});

	$('#left').mousedown(function () {
		sendRequest('left');
	});

	$('#right').mousedown(function () {
		sendRequest('right');
	});

	$('#stop').mousedown(function () {
		sendRequest('stop');
	});

	$('#clear_console').click(function () {
		$('#debugConsole').html('');
	});

	$("#sld_cam_hor").slider({
		value : 50,
		slide : function (event, ui) {
			moveCam('hor', 100 - ui.value)
		},
		change: function (event, ui) {
			moveCam('hor', 100 - ui.value)
		}
	}).slider("pips", {
		step: 25,
		rest: 'label',
		//labels: ['-90', '-45', '0', '45', '90']
	});

	$("#sld_cam_ver").slider({
		value      : 50,
		orientation: "vertical",
		slide      : function (event, ui) {
			moveCam('ver', 100 - ui.value)
		},
		change     : function (event, ui) {
			moveCam('ver', 100 - ui.value)
		}
	}).slider("pips", {
		step: 25,
		rest: 'label',
		//labels: ['-90', '-45', '0', '45', '90']
	});

	$('#cam_center').click(function () {
		$("#sld_cam_hor").slider("option", "value", 50);
		$("#sld_cam_ver").slider("option", "value", 50);
		moveCam('hor', 50);
		moveCam('ver', 50);
	});

	$('#ping_dist').click(function () {
		$.post('robot.php', {action: 'ping_dist'}, function (data) {
			parseResponse(data);
			data = $.parseJSON(data);
			$('#radar_dist').html(data.performed);
		});
	});

	$('#light_1').click(function () {
		var status = $('#light_1_status').html() == 'OFF' ? 1 : 0;
		$.post('robot.php', {action: 'light', num: 1, status: status}, function (data) {
			parseResponse(data);
			data = $.parseJSON(data);
			$('#light_1_status').html(data.performed);
		});
	});

	$('#show_clock').click(function () {
		$.post('robot.php', {action: 'show_clock'}, function (data) {
			parseResponse(data);
			//data = $.parseJSON(data);
			//$('#light_1_status').html(data.performed);
		});
	});

	$('#radar_sweep').click(function () {
		//var ddData = '{"0":"163.85","5":"164.14","10":"163.85","15":"163.08","20":"153.72","25":"134.29","30":"130.41","35":"20.46","40":"19.36","45":"20.26","50":"17.5","55":"18.97","60":"20.0","65":"23.34","70":"66.96","75":"68.02","80":"79.59","85":"127.86","90":"133.19","95":"81.09","100":"79.97"}';
		//var data = $.parseJSON(ddData);
		$.post('robot.php', {action: 'radar_sweep'}, function (response) {
			response = parseResponse(response);

			if (response.data) {
				drawRadar(response.data);
			}
		});
	});

	function drawRadar(data) {

		var maxDist = 200;

		console.log(data);

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

			console.log(angle + '° - ' + distance + ' cm  ');

			a = distance * Math.sin(angle * tf);
			b = distance * Math.cos(angle * tf);

			console.log(a, b);

			factor = a / maxDist * 160;
			y = 160 - factor;
			factor = b / maxDist * 160;
			x = 160 - factor;
			console.log(x, y);

			x = 320 - (key / 100 * 320);
			y = 160 - (distance / maxDist * 160);

			$('#obj-1-' + key).data('x', x);
			$('#obj-1-' + key).data('y', y);
		}

		setRadarObjects();

		$('#debugConsole').prepend('<p>radar sweep</p>');

		return;
	}

	$('#poweroff').click(function () {
		$('#debugConsole').prepend('<p class="error">Sending POWEROFF...</p>');
		sendRequest('poweroff');
	});

	function sendRequest(action) {
		$.post('robot.php', {action: action}, function (data) {
			parseResponse(data);
		});
	}

	function moveCam(direction, position) {
		$.post('robot.php', {
			action: 'cam', direction: direction, position: position
		}, function (data) {
			parseResponse(data);
		});
	}

	function parseResponse(data) {
		data = $.parseJSON(data);
		console.log(data);

		var d = new Date();
		var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

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
			if (deg == 90) {
				deg = 270;
			}
			rotate();
		}, 10);
	})();
});