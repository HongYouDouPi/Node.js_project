const express = require('express')

    // //express 操作
const app = express();


// 创建路由
app.get('/request',(req,res) => {
        //获取请求头 .get()操作只能用于请求头里面有的内内容
    // console.log("当前地址",req.get('host'));  


    //原生操作
    console.log(req.method);
    const fullUrl = req.protocol + '://' + req.hostname + req.originalUrl;
    console.log("请求 URL:", fullUrl);
    // console.log("当前地址",req.url,"path",req.path);
    // console.log(req.httpVersion)
    // console.log(reg.headers);
    // 查询参数
    console.log(req.query);
    //获取 ip  会输出IPV4前缀
    // console.log(req.ip);
    res.end("hello express");

})

app.listen(3000,()=>{
    console.log("3000 service listening");
})