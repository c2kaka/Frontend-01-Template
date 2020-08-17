const http = require('http');

const options = {
    host: 'localhost',
    port: 8081,
    path: '/?filename=x.html',
    method: 'GET'
};

// Make a request
const req = http.request(options);
req.end();