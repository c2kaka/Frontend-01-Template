const http = require('http');
const querystring = require('querystring');

const postData = querystring.stringify({
    'content': 'Hello World123!'
});

const options = {
    host: 'localhost',
    port: 8081,
    path: '/?filename=x.html',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
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
req.write(postData);
req.end();