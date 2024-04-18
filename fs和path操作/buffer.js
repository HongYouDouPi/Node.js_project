let buf =Buffer.alloc(10);
let word = Buffer.from('loveyou');
let name = Buffer.from('小冰\r\n');
// console.log(word);
let word_sh = Buffer.from([108,111,118,101,121,111,117]);
let word_sh_string =word_sh.toString();
// console.log(word_sh.toString());            //将word_sh从十六进制转化为英文 ascall码

// console.log(word_sh[1].toString());     //打印word_sh的第二个元素


//向文件中写入数据
    // 导入fs模块
const fs = require('fs');
    //下面的是异步版本 即先继续往下执行 此时的写入操作转到另外一个进程中 原来执行的接着执行 直到写入操作(I/O)操作完成 将其再压入原来的进程栈
    //当然他还有一个同步版本的 叫writrFileSync()
// fs.writeFile('firstWord.txt',word,(err)=>{      
//     if(err){
//         console.log('创建文件firstWord.txt失败/写入失败');
//         return;
//     }
//     console.log('写入成功');
// })
//     // 对文件追加写入 （不复写
// fs.appendFile('firstWord.txt',name,(err)=>{
//         if(err){
//             console.log('写入失败');
//             return;
//         }
//         console.log('写入成功'); 
//     })

    // 流式写入
    //     创建流
// const ws =fs.createWriteStream('firstWord.txt');

//         // 需要写入时 
// ws.write(word_sh_string);
// console.log(word_sh_string);
//         //关闭通道
// ws.close();

// 对文件读取 输出在控制台
fs.readFile('firstWord.txt',(err,data)=>{
    if(err){
        console.log('读取失败');
        return;
    }
    console.log(data.toString());
})

