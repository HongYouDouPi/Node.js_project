// 这是一个对http请求的nodejs文件

// 首先第一步需要导入模块
const http = require('http');
    // url模块
const url = require('url');

// 第二步开始创建服务对像
    // 创建服务用的是http自己的函数 会返回两个参数 前面是请求 后面是返回值
const server =http.createServer((request,response)=>{
        
        // 请求操作 解析
    // 首先可以在浏览器 用F12打开 然后点到网络项 选中随便一项点击标头 就可以看到此次互动都有什么操作 // 不过不可能我们每次都通过F12的操作查看

        // 获取整个请求头
    // console.log(request.headers);
    // 单独获取一个网页连接
    console.log("获取当前网页url地址",request.headers.host);

    // 获取请求的方法
    console.log("请求的方法",request.method);
    // 获取请求的url  但是只包含了url中的路径和查询字符串 也就是网页总体后面的请求参数之类的
    // console.log(request.url);
    // 获取协议版本号 几乎很少用
    // console.log(request.httpVersion);
    
        // 获取请求体
    // 先声明一个变量
    let body = '';
        // 只有post操作才有请求体
    // 将这个body绑定在data事件上
    request.on('data',chunk => {
        body += chunk;
    })

        // url模块的操作
    // 假设有个原来的url请求
    const requestURL = "http://"+request.headers.host+request.url;
    console.log("请求的URL",requestURL);
    // 先构造一个url对像
    const urlParse = new url.URL(requestURL);
    
    console.log("路径输出",urlParse.pathname);
    // 构造对像 解析查询字符串
    const searchParams = new URLSearchParams(urlParse.search);
    // 用get方法返回指定名称的第一个值
    console.log("查询字符输出",searchParams.get('keyword'));

    //         // 旧版 已过时
    // let urlres = url.parse(request.url)
    // // console.log("url模块的解析操作输出",urlres);
    // console.log("打印路径输出",urlres.pathname);
    // console.log("打印查询字符串",urlres.query.keyword);


    // 在请求结束的时候输出这个body
    request.on('end',() => {
        console.log("绑定的data数据",body);
        // 响应体
        response.end('send some masage');

    })

        
    
        //设置响应体 如果没有获取请求体可以取消注释此项
    // response.end('send some masage');
    //有中文时需要加上这个utf-8和前面的html类型
    // response.setHeader('content-type','text/html;charset=utf-8'); 
    // response.end('Hello World 你好');
    // response.end只能有一个

})

// 第三步监听端口
    // 其次端口号默认是80[http为80 https为443](如果下面的9000设置为80则浏览器中直接输入127.0.0.1就可以了 不需要加上:9000/8090/8080/3000 的端口号)
server.listen(9000,()=>{
    console.log('服务已成功启动');
})

//第四步成功启动服务 在浏览器查看 http://127.0.0.1:9000


