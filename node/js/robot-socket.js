/**
 * Created by elkuku on 13.11.15.
 */

var socket = io.connect('http://localhost');

socket.on('news', function (data) {
	console.log(data);
});

// Direction pots
socket.on('p1', function (data) {
	$('#p1').html(data.raw);
	KuKuRobot.p1 = data.raw;
	KuKuRobot.setDirection();
});

socket.on('p2', function (data) {
	$('#p2').html(data.raw);
	KuKuRobot.p2 = data.raw;
	KuKuRobot.setDirection();
});

// Camera pots
socket.on('p3', function (data) {
	$('#p3').html(data.raw);
	var dir;
	if (data.raw < 250) {
		dir = 'left';
	}
	else if (data.raw > 750) {
		dir = 'right';
	}

	if(dir) {
		$("#camera_direction").html(dir);
		var val = $('#sld_cam_hor').slider("option", "value");
		$("#sld_cam_hor").slider('value', 'left' == dir ? val - 1 : val + 1);
	}
});

socket.on('p4', function (data) {
	$('#p4').html(data.raw);
	var dir;
	if (data.raw < 250) {
		dir = 'down';
	}
	else if (data.raw > 750) {
		dir = 'up';
	}

	if(dir) {
		$("#camera_direction").html(dir);
		var val = $('#sld_cam_ver').slider("option", "value");
		$("#sld_cam_ver").slider('value', 'down' == dir ? val - 1 : val + 1);

	}
});

// Other pots
socket.on('p5', function (data) {
	$('#p5').html(data.raw);
	//var val = data.raw / 1024 * 100;
	//console.log(val);
});

socket.on('p6', function (data) {
	$('#p6').html(data.raw);
	//var val = data.raw / 1024 * 100;
	//console.log(val);
});

socket.on('btnLight', function (data) {
	KuKuRobot.toggleLight(1, data.status);
	$('#light_1_status').html(data.status ? 'ON' : 'OFF');
});

socket.on('btnClock', function () {
	KuKuRobot.showClock();
});

socket.on('btnCamCenter', function () {
	$('#sld_cam_hor').slider('option', 'value', 50);
	$('#sld_cam_ver').slider('option', 'value', 50);
});
