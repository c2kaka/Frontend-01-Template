const http = require('http');
const querystring = require('querystring');
const fs = require('fs');
const archiver = require('archiver');

let fileName = './package';
// fs.stat(fileName, (error, stat) => {
//     console.log(stat);
const options = {
    host: 'localhost',
    port: 8081,
    path: '/?filename=package.zip',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'Content-Length': stat.size
    }
};

var archive = archiver('zip', {
    zlib: {level: 9} // Sets the compression level.
});

archive.directory(fileName, false);

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

archive.pipe(req);

archive.finalize();
// Write data to request body
// let readStream = fs.createReadStream('./package');
// readStream.pipe(req);
// readStream.on('end', () => {
//     req.end();
// });
// req.write(postData);
// req.end();
// });
