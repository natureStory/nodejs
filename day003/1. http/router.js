var querystring = require('querystring');
var url = require('url');
var MongoClient = require('mongodb').MongoClient;
var mongoUrl = "mongodb://localhost:27017/nature";
MongoClient.connect(mongoUrl, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    console.log("数据库已创建!");
    var dbase = db.db("nature");
    dbase.createCollection('todos', function (err, res) {
        if (err) throw err;
        console.log("创建集合!");
        db.close();
    });
});

module.exports = function(request, pathname, response) {
    // console.log(request.method, pathname);
    // response.writeHead(200, 'text/json');
    // response.end('{"abc": "nihao", "no": 123}');
    switch (pathname) {
        case '/api/todo':
            if(request.method === 'GET') {  // 请求单条数据

            } else if (request.method === 'POST') { // 创建todo
                var data = '';
                request.on('data', function (chunk) {
                    data+=chunk;
                });
                request.on('end', function () {
                    data = decodeURI(data);
                    console.log(data);
                    var dataObject = JSON.parse(data);
                    MongoClient.connect(mongoUrl, { useNewUrlParser: true }, function(err, db) {
                        if (err) throw err;
                        var dbo = db.db("nature");
                        dbo.collection("todos").insertOne( {
                            ...dataObject,
                            createTime: new Date().toLocaleString()
                        }, function(err, res) {
                            if (err) throw err;
                            console.log("文档插入成功");
                            response.writeHead(200, 'text/json');
                            response.end('{"msg": "ok"}');
                            db.close();
                        });
                    });
                });
            } else if (request.method === 'DELETE') {   // 删除todo

            }
        case '/api/list':
            if(request.method === 'GET') {  // 请求数据列表
                var arg=url.parse(request.url).query;
                var name=querystring.parse(arg)['name'];
                MongoClient.connect(mongoUrl, { useNewUrlParser: true }, function(err, db) {
                    if (err) throw err;
                    var dbo = db.db("nature");
                    dbo.collection("todos"). find({name}).toArray(function(err, result) { // 返回集合中所有数据
                        if (err) throw err;
                        response.writeHead(200, {'Content-Type':'text/json;charset=UTF8'});
                        response.end(JSON.stringify(result));
                        db.close();
                    });
                });
            } else if (request.method === 'DELETE') {   // 清空数据

            }
        default:
            if(request.method === 'GET') {  //
            } else if (request.method === 'POST') { //
            } else if (request.method === 'DELETE') {   //
            }
            break;
    }
};
