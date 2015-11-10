var app = require('http').createServer(handler),
	io = require('socket.io').listen(app),
	fs = require('fs'),
	five = require("johnny-five"),
	board,
		sensor1,
		sensor2
		;


board = new five.Board();

board.on("ready", function () {

	sensor1 = new five.Sensor({
		pin : "A0",
		freq: 200
	});

	sensor2 = new five.Sensor({
		pin : "A1",
		freq: 200
	});

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

	if (ext == 'css' || ext == 'js' || ext == 'woff2' || ext == 'woff' || ext == 'ttf' || ext == 'svg') {
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
		sensor1.on("data", function () {
			socket.emit('sensor1', {raw: this.raw});
		});
		sensor2.on("data", function () {
			socket.emit('sensor2', {raw: this.raw});
		});
	}
});
