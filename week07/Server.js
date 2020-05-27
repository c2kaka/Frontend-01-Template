const http = require('http');

const server = http.createServer((req, res) => {
	console.log('request received');
	console.log(req.headers);
	res.setHeader('Content-Type', 'text/html');
	res.setHeader('X-Foo', 'bar');
	res.writeHead(200, { 'Content-Type': 'text/plain' });

	const html = `<style>
    div {
        border:solid 1px black
    }
</style>
<div style="align-items:center;display:inline-flex;width:500px;justify-content:space-around;">
    <div  style="flex:1;width:100px;height:70px;"></div>
    <div  style="width:200px;height:50px;"></div>
    <div  style="width:200px;height:100px;"></div>
</div>`;
	res.end(html);
});

server.listen(8088);
