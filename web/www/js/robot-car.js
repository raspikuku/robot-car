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

	function sendRequest(action) {
		$.post('robot.php', { action: action}, function (data) {
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
