var fs = require('fs');
var rs = fs.createReadStream('example.txt', 'utf-8');
rs.on('data', function (chunk) {
    console.log('data');
    console.log(chunk);
});
rs.on('end', function () {
    console.log('end');
});
rs.on('error', function (err) {
    console.log(err);
});
