/**
 * Created by elkuku on 30.09.15.
 */

var KuKuRobot = {
	connected : false,
	robot_name: 'unnamed',
	ip        : '',
	direction : '',

	getStatus: function () {
		return this.connected + ' : ' + this.robot_name;
	},

	connect: function (ip) {
		var _this = this;
		$.post('http://' + ip + '/robot.php', {action: 'connect'}, function (data) {
				data = $.parseJSON(data);

				$("#robot_status").html(data.performed);
				$("#inData").append("connected to " + data.performed + "\r");

				_this.robot_name = data.performed;
				_this.ip = ip;

				_this.connected = true;
			})
			.fail(function () {
				alert("error connecting to the robot");
				$("#inData").append("ERROR\r");
			});
	},

	isConnected: function () {
		return this.connected;
	},

	disconnect: function () {
		this.connected = false;
		this.robot_name = 'unnamed';
	},

	processPot: function (num, value) {
		if (false == this.isConnected()) {
			return;
		}

		//console.log("Incoming sensor data:", num, value);
		//$("#inData").append("Incoming sensor data:" + num + ': ' + value + "\r");
		//$("#inData").animate({scrollTop: $("#inData")[0].scrollHeight - $("#inData").height()}, 200);
		//var val = parseInt(value / 1023 * 100);
		//val = 100 - val;
		//console.log(val);

		$('#p' + num).html(value);

		var lr_mid = 470;
		var ud_mid = 330;

		var dir;

		if (p1 > lr_mid + 200) {
			dir = 'right';
		}
		else if (p1 < lr_mid - 200) {
			dir = 'left';
		}
		else if (p2 > ud_mid + 100) {
			dir = 'rev';
		}
		else if (p2 < ud_mid - 100) {
			dir = 'fwd';
		}
		else {
			dir = 'stop';
		}

		if (dir != this.direction) {
			this.direction = dir;
			$('#robot_direction').html(this.direction);
			$.post('http://' + this.ip + '/robot.php',
				{action: this.direction},
				function (data) {
					console.log(data);
				});
		}


		/*
		 var dir = 1 == num ? 'hor' : 'ver';
		 $.post('http://192.168.0.102/robot.php', {
		 action: 'cam', direction: dir, position: val
		 }, function (data) {
		 console.log(data);
		 });

		 */

	},

	poweroff: function () {
		$.post('http://' + this.ip + '/robot.php',
			{action: 'poweroff'},
			function (data) {
				console.log(data);
			});

	}
};

$(document).ready(function () {
	$('#robot_connect').click(function () {
		var status = $("#inData");

		if (KuKuRobot.isConnected()) {
			KuKuRobot.disconnect();
			$("#robot_status").html('OFFLINE');
			status.prepend("disconnect\r");

			return false;
		}

		status.prepend("Connecting...\r");

		var ip = $('#robot_ip').val();

		if (!ip) {
			alert('Please enter an IP');

			return false;
		}

		KuKuRobot.connect(ip);

		return false;
	});

	$('#poweroff').click(function () {
		$('#inData').prepend('<p class="error">Sending POWEROFF...</p>');
		KuKuRobot.poweroff();
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

	$("#sld_windrose").slider({
		max   : 360,
		slide : function (event, ui) {
			setBearing(ui.value);
		},
		change: function (event, ui) {
			setBearing(ui.value);
		}
	});

	function setBearing(degrees) {
		$("#windrose").rotate(360 - degrees);
		$('#bearing').html(degrees + ' &deg;');
	}

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

	var update_status_running = false;

	function update_status() {
		if (false == update_status_running) {
			return;
		}

		$.post('robot.php', {action: 'status'}, function (data) {
			data = parseResponse(data);
			console.log(data);

			var status = $.parseJSON(data.data)
			console.log(status);

			setBearing(parseInt(status.bearing));

			$('#magnet_x').html(status.magnet_x);
			$('#magnet_y').html(status.magnet_y);
			$('#magnet_z').html(status.magnet_z);


			setTimeout(update_status, 1000);
		});
	}

	$('#update_status').click(function () {
		console.log(update_status_running);
		if (update_status_running) {
			update_status_running = false;

			$('#update_status_status').html('OFF');

			return;
		}

		$('#update_status_status').html('ON');

		update_status_running = true;

		update_status();

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
