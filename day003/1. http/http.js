var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

var router = require('./router');

var root = path.resolve(process.argv[2] || '.');
http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    var filepath = path.join(root, pathname);
    if(/api/.test(pathname)) {
        // 请求
        router(request, pathname, response);
    } else {
        // 页面
        console.log(filepath);
        fs.stat(filepath, (err, stats) => {
            if(err){
                response.writeHead(404);
                response.end();
            }else{
                response.writeHead(200);
                fs.createReadStream(filepath).pipe(response);
            }
        });
    }
}).listen(8088);

console.log('项目访问：http://localhost:8088/index.html');
