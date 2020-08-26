const http = require('http');
const fs = require('fs');
const unzip = require('unzipper');
const https = require('https');

const server = http.createServer((req, res) => {
	if (req.url.match(/^\/auth/)) {
		return auth(req, res);
    }
    
    if (!req.url.match(/^\/$/)) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
		res.end('not found');
    }

	let matched = req.url.match(/filename=([^&]+)/);
	let fileName = matched && matched[1];
	// if (!fileName) return;

	// let writeStream = fs.createWriteStream('../server/public/' + fileName);
	if (fileName) {
		let writeStream = unzip.Extract({ path: '../server/public' });
		req.pipe(writeStream);
	}

	req.on('end', () => {
		res.writeHead(200, { 'Content-Type': 'text/plain' });
		res.end('okay');
	});
});

function auth(req, res) {
	let code = req.url.match(/code=([^&]+)/)[1];

	let state = 'abc123';
	let client_secret = '4c5a4e7da4511009b369155ba06f1eddb6f6874a';
	let client_id = 'Iv1.a626c41089306117';
	let redirect_uri = encodeURIComponent('http://localhost:8081/auth');
	let params = `code=${code}&state=${state}&client_secret=${client_secret}&client_id=${client_id}&redirect_uri=${redirect_uri}`;

	const options = {
		hostname: 'github.com',
		port: 443,
		path: `/login/oauth/access_token?${params}`,
		method: 'POST',
	};

	const request = https.request(options, (response) => {
		console.log('statusCode:', res.statusCode);
		console.log('headers:', res.headers);

		response.on('data', (d) => {
			console.log('d.toString', d.toString());
            let result = d.toString().match(/access_token=([^&]+)/);
            if(result) {
                let token = result[1];
                res.writeHead(200, {
                    'access_token': token,
                    'Content-Type': 'text/plain'
                });
                res.end('okay');
            } else {
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.end('error');
            }
		});
	});

	request.on('error', (e) => {
		console.error(e);
	});
	request.end();
}

server.listen(8081);
