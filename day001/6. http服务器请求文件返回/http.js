var fs = require('fs');
var url = require('url');
var path = require('path');
var http = require('http');

var root = path.resolve(process.argv[2] || '.');
var server = http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    var filepath = path.join(root, pathname);
    const list = ['', 'index.html', 'default.html'];
    function fsstat(p, count) {
        fs.stat(path.join(p, list[count]), function (err, stat) {
            if (err || !stat.isFile()) {
                if(count<3) {
                    fsstat(p, ++count);
                } else {
                    console.log('404' + request.url);
                    response.writeHead(404);
                    response.end('not fond');
                }
            } else {
                console.log('200' + request.url);
                response.writeHead(200);
                fs.createReadStream(path.join(p, list[count])).pipe(response);
            }
        })
    }
    fsstat(filepath, 0);
});
server.listen(8080);
console.log('server is running!');
