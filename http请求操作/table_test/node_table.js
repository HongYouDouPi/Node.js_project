// 首先引入模块
const http = require('http')
const fs = require('fs')
const path = require('path');
const { log } = require('console');

// 实例化服务
const server =http.createServer((req,res)=>{
    // 请求路径
    // let {pathname} = new URL(req.url);
    let pathname =req.url;
    console.log(pathname);

    let dirFilename = fs.readdirSync(__dirname);
    // if(/\.html$/.test(pathname)){
    //     const htmlcontent = fs.readFileSync(path.join(__dirname,pathname));

    //     console.log("html加载完成");
    //     res.end(htmlcontent);

    // }

    let html = dirFilename.filter(name =>/\.html$/.test(name))[0];
    const htmlcontent = fs.readFileSync(path.join(__dirname,html));
    console.log(pathname);
    // res.end(htmlcontent);

    if(pathname === '/'){
        console.log("html加载完成");
        res.end(htmlcontent);
    }
    else if(/\.css$/.test(pathname)){
        console.log(pathname);

        const csscontent = fs.readFileSync(path.join(__dirname,pathname));

        console.log("css加载完成");
        res.end(csscontent);
    }
    else if(/\.js$/.test(pathname)){
        const jscontent = fs.readFileSync(path.join(__dirname,pathname));

        console.log("js加载完成");
        res.end(jscontent);
    }
    else {
        // 如果请求的文件类型不是 html/css/js 中的任何一种，则返回 404 错误
        res.writeHead(404);
        res.end('404 Not Found');
    }


})

// 监听一下
server.listen(9000,()=>{
    console.log("监听中9000端口");
})