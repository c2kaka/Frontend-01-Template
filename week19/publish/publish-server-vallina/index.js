const http = require('http');
const fs = require('fs');
const unzip = require('unzipper');

const server = http.createServer((req, res) => {
    console.log(req.url);
    if(req.url.match(/^\/auth/)) {
        return auth(req, res);
    }


    let matched = req.url.match(/filename=([^&]+)/);
    let fileName = matched && matched[1];
    console.log(fileName);
    // if (!fileName) return;

    // let writeStream = fs.createWriteStream('../server/public/' + fileName);
    if(fileName) {
        let writeStream = unzip.Extract({path: '../server/public'});
        req.pipe(writeStream);
    }

    req.on('end', () => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('okay');
    });
})

function auth(req, res) {
    let code = req.url.match(/code=([^&]+)/)[1];
    console.log(code);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('okay');
}

server.listen(8081);