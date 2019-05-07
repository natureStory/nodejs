var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

var root = path.resolve(process.argv[2] || '.');
http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    var filepath = path.join(root, pathname);
    if(/page/.test(pathname)) {
        // 页面
        response.writeHead(200, 'text/html');
        fs.createReadStream(filepath).pipe(response);
    } else {
        // 请求
        console.log(request.method);
        response.writeHead(200, 'text/json');
        response.end('{"abc": "nihao", "no": 123}');
    }
}).listen(8080);
