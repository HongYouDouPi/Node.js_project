// 1.要求当请求方法为get 且url响应路径为/login的时候 跳转到登陆界面 如果是/reg则跳转到注册界面

    // 先引入http
const http = require('http');
const url = require('url');
    // 实例化
const server = http.createServer((req,res) =>{

    const urlRequest ="http://"+req.headers.host+req.url;
    console.log("整体URL",urlRequest);

    // 获取操作
    const urlMethod = req.method
    console.log("获取操作",urlMethod);
    //解析url
    const urlPrase = new url.URL(urlRequest);

    // 中文需要
    res.setHeader('content-type','text/html;charset=utf-8')

    if(urlMethod === 'GET'&& urlPrase.pathname === '/search'){
        console.log("查询操作");
        res.end('search something');
    }
    else if(urlMethod === 'GET' && urlPrase.pathname === '/login'){
        console.log("登陆操作");
        res.end('login in');
    }

    else {
        res.end('test')
    }
    
})

    // 监听
server.listen(9000,()=>{
    console.log("服务启动 9000端口监听中");
})

