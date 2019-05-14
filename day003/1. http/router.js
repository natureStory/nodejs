var querystring = require('querystring');
var url = require('url');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var mongoUrl = "mongodb://localhost:27017/nature";
MongoClient.connect(mongoUrl, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    console.log("数据库已创建!");
    var dbase = db.db("nature");
    dbase.createCollection('todos', function (err, res) {
        if (err) throw err;
        console.log("集合已创建!");
        db.close();
    });
});

module.exports = function(request, pathname, response) {
    // console.log(request.method, pathname);
    // response.writeHead(200, 'text/json');
    // response.end('{"abc": "nihao", "no": 123}');
    switch (pathname) {
        case '/api/todo':
            if(request.method === 'PUT') {  // 更新todo完成状态
                var data = '';
                request.on('data', function (chunk) {
                    data+=chunk;
                });
                request.on('end', function () {
                    var dataObject = JSON.parse(data);
                    MongoClient.connect(mongoUrl, { useNewUrlParser: true }, function(err, db) {
                        if (err) throw err;
                        var dbo = db.db("nature");
                        dbo.collection("todos").updateOne( {
                            _id: ObjectId(dataObject.id)
                        }, { $set: {
                                status: 2
                            }
                        }, function(err, res) {
                            if (err) throw err;
                            console.log("文档更新成功");
                            response.writeHead(200, 'text/json');
                            response.end('{"msg": "ok"}');
                            db.close();
                        });
                    });
                });

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
                            createTime: new Date().toLocaleString(),
                            status: 1
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
                        dbo.collection("todos").deleteOne( {
                            _id: ObjectId(dataObject.id)
                        }, function(err, res) {
                            if (err) throw err;
                            console.log("文档删除成功");
                            response.writeHead(200, 'text/json');
                            response.end('{"msg": "ok"}');
                            db.close();
                        });
                    });
                });
            }
            break;
        case '/api/list':
            if(request.method === 'GET') {  // 请求数据列表
                var arg=url.parse(request.url).query;
                var name=querystring.parse(arg)['name'];
                MongoClient.connect(mongoUrl, { useNewUrlParser: true }, function(err, db) {
                    if (err) throw err;
                    var dbo = db.db("nature");
                    dbo.collection("todos").find({name}).sort({createTime: -1}).toArray(function(err, result) { // 返回集合中所有数据
                        if (err) throw err;
                        response.writeHead(200, {'Content-Type':'text/json;charset=UTF8'});
                        response.end(JSON.stringify(result));
                        db.close();
                    });
                });
            } else if (request.method === 'DELETE') {   // 清空数据
                var data = '';
                request.on('data', function (chunk) {
                    data+=chunk;
                });
                request.on('end', function () {
                    data = decodeURI(data);
                    var dataObject = JSON.parse(data);
                    MongoClient.connect(mongoUrl, { useNewUrlParser: true }, function(err, db) {
                        if (err) throw err;
                        var dbo = db.db("nature");
                        dbo.collection("todos").deleteMany( {
                            name: dataObject.name
                        }, function(err, res) {
                            if (err) throw err;
                            console.log("文档删除全部成功");
                            response.writeHead(200, 'text/json');
                            response.end('{"msg": "ok"}');
                            db.close();
                        });
                    });
                });
            }
            break;
        default:
            response.writeHead(404, {'Content-Type':'text/json;charset=UTF8'});
            response.end(JSON.stringify({msg: 'api not found'}));
            break;
    }
};
