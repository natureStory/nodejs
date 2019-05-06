var fs = require('fs');
var ws = fs.createWriteStream('example.txt', 'utf-8');
ws.write('文采采斐然，举止止文雅\r');
ws.write(`${new Date()}`);
ws.end();
