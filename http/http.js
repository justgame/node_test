var http = require('http');

http.
	createServer(function (req, res) {
		res.statusCode = 200;
		res.setHeader("Context-Type", "text/plain");
		res.end("test one more time");
	}).listen(3000);