const crypto = require("crypto");
const hash = crypto.createHash('md5');
hash.update('hello, world!');
hash.update('hello, nodejs!');
console.log(hash.digest('hex'));

const hmac = crypto.createHmac('sha256', 'secret-keys');
hmac.update('hello, world!');
hmac.update('hello, nodejs!');

console.log(hmac.digest('hex'));
