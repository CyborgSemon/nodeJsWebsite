const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req, res)=> {
	console.log(`${req.method} request for ${req.url}`);
	let alowedFiles = [
		{
			file: './index.html',
			url: '/',
			type: 'text/html'
		},
		{
			file: './css/main.css',
			url: '/css/main.css',
			type: 'text/css'
		},
		{
			file: './js/main.js',
			url: '/js/main.js',
			type: 'text/js'
		},
		{
			file: './images/js.jpg',
			url: '/images/js.jpg',
			type: 'image/jpeg'
		}
	];

	let check = true;

	for (var i = 0; i < alowedFiles.length; i++) {
		if (req.url == alowedFiles[i].url) {
			check = false;
			loadFile(alowedFiles[i].file, alowedFiles[i].type);
		}
	}

	if (check) {
		res.writeHead(200, {'Content-Type':'text/plain'});
		res.end('404 file not found');
	}

	function loadFile (file, type) {
		const fullPath = path.join(__dirname, 'public', file);

		let s = fs.createReadStream(fullPath);
		s.on('open', function () {
			res.setHeader('Content-Type', type);
			s.pipe(res);
		});
		s.on('error', function () {
			res.setHeader('Content-Type', 'text/plain');
			res.statusCode = 404;
			res.end('Not found');
		});
	}
}).listen(3000);

console.log('Port 3000 yo! Lets go');