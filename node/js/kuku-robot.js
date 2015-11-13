/**
 * Created by elkuku on 30.09.15.
 */

var KuKuRobot = {
	connected : false,
	robot_name: 'unnamed',
	ip        : '',
	direction : '',

	connect: function (ip) {
		this.log('Connecting...');
		var _this = this;

		$.post(
				'http://' + ip + '/robot.php',
			{action: 'connect'},
			function (data) {
				data = $.parseJSON(data);

				_this.log("Connected to " + data.performed);

				$("#robot_status").html(data.performed);
				$('#robot_connect').html('Disconnect');

				_this.robot_name = data.performed;
				_this.ip = ip;
				_this.connected = true;
				_this.start_display();
				_this.update_status();
				$('#camera').attr('src', 'http://' + ip + ':8081/?action=stream');
			})

			.fail(function () {
					alert('Error connecting to the robot');
					_this.log('ERROR');
				}
			);
	},

	disconnect: function () {
		this.connected = false;
		this.robot_name = 'unnamed';
		this.clear_display();
		this.log("Disconnected");
	},

	isConnected: function () {
		return this.connected;
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

		if (p2 > lr_mid + 200) {
			dir = 'right';
		}
		else if (p2 < lr_mid - 200) {
			dir = 'left';
		}
		else if (p1 > ud_mid + 100) {
			dir = 'rev';
		}
		else if (p1 < ud_mid - 100) {
			dir = 'fwd';
		}
		else {
			dir = 'stop';
		}

		if (dir != this.direction) {
			this.direction = dir;
			$('#robot_direction').html(this.direction);
			this.sendRequest({action: this.direction});
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

	clear_display: function(){
		$("#robot_status").html('OFFLINE');
		$('#robot_connect').html('Connect');
		$('#robot_direction').html('---');
		$('#light_1_status').html('-');
		$('#magnet_x').html('-');
		$('#magnet_y').html('-');
		$('#magnet_z').html('-');
		$("#windrose").rotate(0);
		$('#bearing').html('0 &deg;');
		$('#camera').attr('src', '');
	},

	start_display: function(){
		$('#robot_direction').html('');
		$('#light_1_status').html('OFF');
		$('#magnet_x').html('0');
		$('#magnet_y').html('0');
		$('#magnet_z').html('0');
	},

	update_status: function () {
		if (false == this.connected) {
			return;
		}

		var _this = this;

		$.post('http://' + this.ip + '/robot.php', {action: 'status'}, function (data) {
			data = $.parseJSON(data);

			var status = $.parseJSON(data.data);

			_this.setBearing(parseInt(status.bearing));

			$('#magnet_x').html(status.magnet_x);
			$('#magnet_y').html(status.magnet_y);
			$('#magnet_z').html(status.magnet_z);

			setTimeout(_this.update_status(), 1000);
		});
	},

	setBearing: function(degrees) {
		$("#windrose").rotate(360 - degrees);
		$('#bearing').html(degrees + ' &deg;');
	},

	moveCam: function (direction, position) {
		this.sendRequest({action: 'cam', direction: direction, position: position});
	},

	toggleLight: function (num, status) {
		this.sendRequest({action: 'light', num: num, status: status});
	},

	showClock: function () {
		this.sendRequest({action: 'show_clock'});
	},

	poweroff: function () {
		this.log('<p class="error">Sending POWEROFF...</p>');
		this.sendRequest({action: 'poweroff'});
	},

	sendRequest: function (command) {
		$.post('http://' + this.ip + '/robot.php',
			command,
			function (data) {
				//console.log(data);
			}
		);
	},

	getStatus: function () {
		return this.connected + ' : ' + this.robot_name;
	},

	log: function (message) {
		$("#inData").prepend(message + "\r");
	}
};
