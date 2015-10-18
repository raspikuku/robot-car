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
		},
		change: function(event, ui) {
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
		},
		change: function(event, ui) {
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

	$('#ping_dist').click(function() {
		$.post('robot.php', { action: 'ping_dist'}, function (data) {
			parseResponse(data);
			data = $.parseJSON(data);
			$('#radar_dist').html(data.performed);
		});
	});

	$('#radar_sweep').click(function(){
		$.post('robot.php', { action: 'radar_sweep'}, function (data) {
			parseResponse(data);
			data = $.parseJSON(data);
			//$('#radar_dist').html(data.performed);
		});
	});

	$('#poweroff').click(function() {
		$('#debugConsole').prepend('<p class="error">Sending POWEROFF...</p>');
		sendRequest('poweroff');
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

/*
$(function() {

	var $rad = $('#rad'),
			deg = 0;

	(function rotate() {
		$rad.css({ transform: 'rotate(' + deg + 'deg)'});
		setTimeout(function() {
			++deg;
			rotate();
		}, 25);
	})();

});
*/

$(function() {

	var $rad = $('#rad'),
			$obj = $('.obj'),
			deg = 0,
			rad = 160.5; //   = 321/2

	$obj.each(function(){
		var data = $(this).data(),
				pos = {X:data.x, Y:data.y},
				getAtan = Math.atan2(pos.X-rad, pos.Y-rad),
				getDeg = ~~(-getAtan/(Math.PI/180) + 180);
		$(this).css({left:pos.X, top:pos.Y}).attr('data-atDeg', getDeg);
	});

	(function rotate() {
		$rad.css({transform: 'rotate('+ deg +'deg)'});
		$('[data-atDeg='+deg+']').stop().fadeTo(0,1).fadeTo(1700,0.2);

		// LOOP
		setTimeout(function() {
			deg = ++deg%360;
			/* if(deg == 90){deg = 270;} */
			rotate();
		}, 25);
	})();
});