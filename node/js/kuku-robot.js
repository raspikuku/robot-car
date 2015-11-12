/**
 * Created by elkuku on 30.09.15.
 */

var KuKuRobot = {
	connected : false,
	robot_name: 'unnamed',
	ip        : '',
	direction : '',

	div_status: '',

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
			})

			.fail(function () {
					alert("Error connecting to the robot");
					_this.log('ERROR');
				}
			);
	},

	disconnect: function () {
		this.connected = false;
		this.robot_name = 'unnamed';
		$("#robot_status").html('OFFLINE');
		$('#robot_connect').html('Connect');
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

	toggleLight: function (num, status) {
		this.sendRequest({action: 'light', num: num, status: status});
	},

	poweroff: function () {
		this.log('<p class="error">Sending POWEROFF...</p>');
		this.sendRequest({action: 'poweroff'});
	},

	sendRequest: function (command) {
		$.post('http://' + this.ip + '/robot.php',
			command,
			function (data) {
				console.log(data);
			}
		);
	},

	getStatus: function () {
		return this.connected + ' : ' + this.robot_name;
	},

	log: function (message) {
		this.div_status.prepend(message + "\r");
	}
};
