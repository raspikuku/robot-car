/**
 * Created by elkuku on 13.11.15.
 */

var socket = io.connect('http://localhost');

socket.on('news', function (data) {
	console.log(data);
});

socket.on('sensor1', function (data) {
	KuKuRobot.p1 = data.raw;
	KuKuRobot.setDirection();
	$('#p1').html(data.raw);
});

socket.on('sensor2', function (data) {
	KuKuRobot.p2 = data.raw;
	KuKuRobot.setDirection();
	$('#p2').html(data.raw);
});

socket.on('btnLight', function (data) {
	KuKuRobot.toggleLight(1, data.status);
	$('#light_1_status').html(data.status ? 'ON' : 'OFF');
});

socket.on('btnClock', function () {
	KuKuRobot.showClock();
});
