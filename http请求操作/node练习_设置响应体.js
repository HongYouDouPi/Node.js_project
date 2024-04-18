// 导入模块
const http = require('http');
const fs = require('fs');
const path = require('path');
const { log } = require('console');

// 获取文件目录 读取所有文件名字
const currentDir = __dirname;
const currentPathAllFile = fs.readdirSync(currentDir);
console.log(currentPathAllFile);
// 读取当前文件夹下的.html后缀的文件 传给html变量 让res.end执行
const html = currentPathAllFile.filter(file => /\.html$/.test(file))[0];
// console.log(html);
const htmlcontent = fs.readFileSync(path.join(currentDir,html));
console.log(path.join(currentDir,html));
// console.log(htmlcontent);

// 创建进程实例
const service = http.createServer((req,res) => {
    // 设置响应头
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    // 发送html内容
    // res.end('test');
    res.end(htmlcontent);
})

// 监听服务
service.listen(9000,()=>{
    console.log("服务启动 监听中");
})