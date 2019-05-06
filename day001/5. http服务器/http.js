var http = require('http');
var url = require('url');
var path = require('path');

var server = http.createServer(function (request, response) {
    console.log(request.method + ':' + request.url);
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end('<h1>hello word</h1>');
});
server.listen(8080);
console.log('server is running!');

var urlResult = url.parse(('http://user:pass@host.com:8080/path/to/file?query=string#hash'));
var filePath = path.join(urlResult.pathname, 'pub', 'index.html');
console.log(filePath);
