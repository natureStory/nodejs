## nodejs 学习笔记
#### day 002
1. 使用crypto模块生成加密字符串
1. createHash生成md5之类的，输入一样，生成结果一样
1. createHmac生成的哈希算法，需要一个秘钥，输入和秘钥都相同才会相同
1. aes生成可以解密的字符串
1. 

#### day 001
1. [exports与module.exports区别](https://www.cnblogs.com/fayin/p/6831071.html)
1. exports = module.exports，所以导出的时候可以module.exports=xxx，但不能exports=xxx，实际破坏了引用关系
1. exports理解：exports是nodejs运行之初就存在的，exports是nodejs引用模块采用IIFE的一个参数，既保证了内部变量不被污染，又能传输出去引用
1. 
1. global 代替 window
1. process代表当前nodejs进程
    ```
    // process.nextTick()将在下一轮事件循环中调用:
    process.nextTick(function () {
        console.log('nextTick callback!');
    });
    console.log('nextTick was set!');
    
    // 程序即将退出时的回调函数:
    process.on('exit', function (code) {
        console.log('about to exit with code: ' + code);
    });
    ```
1. 判断是否为JavaScript环境
    ```
    if (typeof(window) === 'undefined') {
        console.log('node.js');
    } else {
        console.log('browser');
    }
    ```
1. readFile（writeFile）可同步或异步，同步需要try catch捕获错误（但通常只能使用异步）
1. Buffer可以与string互相转换
    ```$xslt
    // Buffer -> String
    var text = data.toString('utf-8');
    console.log(text);
    // String -> Buffer
    var buf = Buffer.from(text, 'utf-8');
    console.log(buf);
    ```
1. stat 获取文件信息
1. fs.createReadStream打开读取流，fs.createWriteStream打开写入流
1. fs.pipe创建复制过程，连接读取流与写入流
1. createServer创建服务器，server.listen(8080监听)，request包含多种请求头信息，使用response返回响应结果writeHead(响应头)和end(响应主体)
1. 
