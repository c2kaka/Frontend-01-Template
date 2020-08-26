const http = require('http');
const querystring = require('querystring');
const fs = require('fs');
const archiver = require('archiver');
const child_process = require('child_process');

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

archive.on('end', () => {
    req.end();
    let redirectUri = encodeURIComponent('http://localhost:8081/auth');
    console.log(`https://github.com/login/oauth/authorize?client_id=Iv1.a626c41089306117&redirect_uri=${redirectUri}&scope=read%3Auser&state=123abc`);
    child_process.exec(`cmd /c start https://github.com/login/oauth/authorize?client_id=Iv1.a626c41089306117&redirect_uri=${redirectUri}&scope=read%3Auser&state=123abc`);
});

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
