const http = require('http');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');

http.createServer((req, res)=> {
	console.log(`${req.method} request for ${req.url}`);

	if (req.method == 'GET') {
		let alowedGetRequests = [
			{
				file: './index.html',
				url: '/',
				type: 'text/html'
			},
			{
				file: './panda.html',
				url: '/panda.html',
				type: 'text/html'
			},
			{
				file: './space.html',
				url: '/space.html',
				type: 'text/html'
			},
			{
				file: './summit.html',
				url: '/summit.html',
				type: 'text/html'
			},
			{
				file: './quiz.html',
				url: '/quiz.html',
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
				file: './js/quiz.js',
				url: '/js/quiz.js',
				type: 'text/js'
			},
			{
				file: './images/js.jpg',
				url: '/images/js.jpg',
				type: 'image/jpeg'
			},
			{
				file: './images/panda.jpg',
				url: '/images/panda.jpg',
				type: 'image/jpeg'
			},
			{
				file: './images/space.png',
				url: '/images/space.png',
				type: 'image/png'
			},
			{
				file: './images/summitLogo.svg',
				url: '/images/summitLogo.svg',
				type: 'image/svg+xml'
			}
		];

		let check = true;

		for (let i = 0; i < alowedGetRequests.length; i++) {
			if (req.url == alowedGetRequests[i].url) {
				check = false;
				loadFile(alowedGetRequests[i].file, alowedGetRequests[i].type);
			}
		}

		if (check) {
			res.writeHead(200, {'Content-Type':'text/plain'});
			res.end('404 File not found');
		}
	} else if (req.method == 'POST') {
		let alowedPostRequests = [
			{
				url: '/sendForm',
				custom: (data)=> {
					let checker = false
					let incroment = 0;
					while (checker == false) {
						if (!fs.existsSync(`public/results/${data.username.toLowerCase()}${incroment}Results.txt`)) {
							checker = true;
						} else {
							incroment++;
						}
					}

					let questions = ['2+2', '4+4', '8+8', '16+16'];
					let correctAnswers = ['4', '8', '16', '32'];

					let fileData = `${data.username} results.\n\n`;
					let summery = `\nSummery:\n`;
					let counter = 0;

					for (var i = 0; i < questions.length; i++) {
						fileData += `Question ${i + 1}: ${questions[i]}\nYour Answer: ${data[`question${i + 1}`]}\nActual answer: ${correctAnswers[i]}\n`;
						summery += `Question ${i + 1}: `;
						if (data[`question${i + 1}`] == correctAnswers[i]) {
							fileData += `Correct!\n\n`;
							summery += `Correct!\n`;
							counter++;
						} else {
							fileData += `Incorrect!\n\n`;
							summery += `Incorrect!\n`;
						}
					}

					fileData += summery;

					fileData += `\nYou got a total of ${counter} / ${questions.length}.`;

					fs.writeFile(`public/results/${data.username.toLowerCase()}${incroment}Results.txt`, fileData, (err)=> {
						if (err) throw err;
						console.log(`Your result can be found in ${data.username.toLowerCase()}${incroment}Results.txt`);
					});

				}
			}
		];

		for (let i = 0; i < alowedPostRequests.length; i++) {
			if (req.url == alowedPostRequests[i].url) {
				let body = '';

				req.on('data', function(data){
					body += data;
				})

				req.on('end', function(){
					postInfo(qs.parse(body.toString()), alowedPostRequests[i].custom);
				});
			}
		}
	}

	function postInfo (infoJSON, customFunction) {
		customFunction(infoJSON);
	}

	function loadFile (file, type) {
		const fullPath = path.join(__dirname, 'public', file);

		let s = fs.createReadStream(fullPath);
		s.on('open', function () {
			res.setHeader('Content-Type', type);
			s.pipe(res);
		});
		s.on('error', function () {
			res.writeHeader(200, {'Content-Type':'text/plain'});
			res.end('404 File not found');
		});
	}
}).listen(3000);

console.log('Port 3000 yo! Lets go');