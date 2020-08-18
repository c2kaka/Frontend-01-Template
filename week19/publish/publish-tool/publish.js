const http = require('http');
const querystring = require('querystring');
const fs = require('fs');

let fileName = './blueCat.jpg';
fs.stat(fileName, (error, stat) => {
    console.log(stat);
    const options = {
        host: 'localhost',
        port: 8081,
        path: '/?filename=blueCat.jpg',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': stat.size
        }
    };

    const req = http.request(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    });

    req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });

// Write data to request body
    let readStream = fs.createReadStream('./blueCat.jpg');
    readStream.pipe(req);
    readStream.on('end', () => {
        req.end();
    });
    // req.write(postData);
    // req.end();
});
