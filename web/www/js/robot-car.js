/**
 * Created by elkuku on 30.09.15.
 */

$(document).ready(function () {
	var intervalId;

	$("#fwd").mousedown(function() {
		sendRequest('fwd');
		intervalId = setInterval(function () {
			sendRequest('fwd')
		}, 500);
	}).mouseup(function() {
		clearInterval(intervalId);
	}).mouseout(function() {
		clearInterval(intervalId);
	});

	$('#rev').mousedown(function() {
		sendRequest('rev');
		intervalId = setInterval(function () {
			sendRequest('rev')
		}, 500);
	}).mouseup(function() {
		clearInterval(intervalId);
	}).mouseout(function() {
		clearInterval(intervalId);
	});

	$('#left').mousedown(function() {
		sendRequest('left');
		intervalId = setInterval(function () {
			sendRequest('left')
		}, 500);
	}).mouseup(function() {
		clearInterval(intervalId);
	}).mouseout(function() {
		clearInterval(intervalId);
	});

	$('#right').mousedown(function() {
		sendRequest('right');
		intervalId = setInterval(function () {
			sendRequest('right')
		}, 500);
	}).mouseup(function() {
		clearInterval(intervalId);
	}).mouseout(function() {
		clearInterval(intervalId);
	});

	$('#stop').mousedown(function() {
		sendRequest('stop');
	});

	$('#clear_console').click(function() {
		$('#debugConsole').html('');
	});

	$("#sld_cam_hor").slider({
		value: 50,
		slide: function(event, ui) {
			moveCam('hor', 100 - ui.value)
		}
	}).slider("pips", {
		step: 25,
		rest: 'label',
		//labels: ['-90', '-45', '0', '45', '90']
	});

	$("#sld_cam_ver").slider({
		value: 50,
		orientation: "vertical",
		slide: function(event, ui) {
			moveCam('ver', 100 - ui.value)
		}
	}).slider("pips", {
		step: 25,
		rest: 'label',
		//labels: ['-90', '-45', '0', '45', '90']
	});

	$('#cam_center').click(function() {
		$("#sld_cam_hor").slider("option", "value", 50);
		$("#sld_cam_ver").slider("option", "value", 50);
		moveCam('hor', 50);
		moveCam('ver', 50);
	});

	$('#poweroff').click(function() {
		sendRequest('poweroff')
	});

	function sendRequest(action) {
		$.post('robot.php', { action: action}, function (data) {
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

	function parseResponse(data){
		data = $.parseJSON(data);
		console.log(data);

		var d = new Date();
		var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

		if(data.performed){
			$('#debugConsole').prepend('<p>' + time + ' ' + data.performed + '</p>');
		}

		if(data.error){
			$('#debugConsole').prepend('<p class="error">' + time + ' ' + data.error + '</p>');
		}
	}
});
