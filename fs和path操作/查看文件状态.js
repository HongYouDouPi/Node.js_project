const fs = require('fs');

let sentence = "miss you";
// //读取文件详细信息
// fs.stat('7月25日.mp4',(err,data)=>{
//     if(err){
//         console.log("读取失败");
//         return;
//     }
//     console.log(data,"读取成功")
// })

// // 特殊路径创建文件
// //     __dirname是读取当前文件的绝对路径文件夹 后面再加上需要写入的文件 就不会出现bug-（创建文件只会在执行文件的目录下创建————当它是相对路径创建文件时
// fs.writeFiles(__dirname +'/绝对路径文件.txt',sentence,(err)=>{
//     if(err){
//         console.log(err,"绝对路径创建文件失败")
//         return
//     }
//     console.log("创建成功")

// });

// //读取文件目录下的文件名字
//     // 获取当前文件夹
// const currentDir = process.cwd();
// console.log(currentDir);

// const name = fs.readdirSync(currentDir);
// // 注意如果使用的是readdir 异步函数 则不会返回值 只会返回引用 所以返回数组 则用同步版本数组
//     // 判断目录下所有名字是文件还是文件夹
// name.forEach(item => {
//     let [filename,style] = item.split('.');
//    if(style){
//     console.log(`文件：${filename}.${style}`)
//    }
//    else
//    console.log(`文件夹：${filename}`)

// });