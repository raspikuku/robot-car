var app = require('http').createServer(handler),
	io = require('socket.io').listen(app),
	fs = require('fs'),
	five = require("johnny-five"),
	board = new five.Board(),
		p1,
		p2,
		p3,
		p4,
		p5,
		p6,
		btnLight,
		ledLight,
		btnClock,
		btnCamCenter,
		led_1_status = 0
		;


//board = new five.Board();

board.on("ready", function () {

	p1 = new five.Sensor({pin : 'A0', freq: 100});
	p2 = new five.Sensor({pin : 'A1', freq: 100});
	p3 = new five.Sensor({pin : 'A2', freq: 100});
	p4 = new five.Sensor({pin : 'A3', freq: 100});
	p5 = new five.Sensor({pin : 'A4', freq: 100});
	p6 = new five.Sensor({pin : 'A5', freq: 100});

	btnLight = new five.Button(2);
	ledLight = new five.Led(8);

	btnClock = new five.Button(3);
	//btnCamCenter = new five.Button(4);
	btnCamCenter = new five.Button({
		pin: 4,
		isPullup: true
	});
	//btnx = new five.Button(5);
});

// make web server listen
app.listen(4000);

// handle web server
function handler(req, res) {
	// Set CORS headers
	/*
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
	res.setHeader('Access-Control-Allow-Headers', '*');
	if ( req.method === 'OPTIONS' ) {
		res.writeHead(200);
		res.end();
		return;
	}
	*/

	var ext = req.url.split('.').pop();

	var fileName;

	if (ext == 'css' || ext == 'js'
		|| ext == 'woff2' || ext == 'woff' || ext == 'ttf'
		|| ext == 'svg' || ext == 'jpg' || ext == 'png') {
		fileName = req.url;
	} else {
		fileName = '/main.html';
	}

	fs.readFile(__dirname + fileName,
		function (err, data) {
			if (err) {
				res.writeHead(500);
				return res.end('Error loading file');
			}

			res.writeHead(200);
			res.end(data);
		});
}

io.sockets.on('connection', function (socket) {
	socket.emit('news', {hello: 'io.sockets started'});

	if (board.isReady) {
		p1.on("data", function () {
			socket.emit('p1', {raw: this.raw});
		});
		p2.on("data", function () {
			socket.emit('p2', {raw: this.raw});
		});
		p3.on("data", function () {
			socket.emit('p3', {raw: this.raw});
		});
		p4.on("data", function () {
			socket.emit('p4', {raw: this.raw});
		});
		p5.on("data", function () {
			socket.emit('p5', {raw: this.raw});
		});
		p6.on("data", function () {
			socket.emit('p6', {raw: this.raw});
		});
		btnLight.on("down", function(){
			if(led_1_status) {
				led_1_status = 0;
				ledLight.off();
			}
			else {
				led_1_status = 1;
				ledLight.on();
			}

			socket.emit('btnLight', {status: led_1_status});
		});
		btnClock.on("down", function(){
			socket.emit('btnClock');
		});
		btnCamCenter.on("down", function(){
			console.log('cam center');
			socket.emit('btnCamCenter');
		});
	}
});
