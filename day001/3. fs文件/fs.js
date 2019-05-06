var fs = require('day001/3. fs文件/fs');
fs.readFile('example.txt', 'utf-8', function (err, data) {
    if(err) {
        console.log(err);
    } else {
        console.log(data);
        fs.writeFile('output.txt', data + new Date(), function (error) {
            if(error) {
                console.log(error);
            } else {
                console.log('ok');
            }
        })
    }
});
fs.readFile('0.jpg', function (err, data) {
    if(err) {
        console.log(err);
    } else {
        console.log(data.length);
    }
});
fs.stat('output.txt', function (err, stat) {
    if(err) {
        console.log(err);
    } else {
        console.log('isFile: ' + stat.isFile());
        console.log('isDirectory：' + stat.isDirectory());
        if(stat.isFile()) {
            console.log('size：' + stat.size);
            console.log('size：' + stat.birthtime);
            console.log('modified time：' + stat.mtime);
        }
    }
})
