var fs = require('fs');
var rs = fs.createReadStream('example.txt');
var ws = fs.createWriteStream('output.txt');
rs.pipe(ws);
