const fs = require('fs');
const { memoryUsage } = require('process');

// //通过整个文件的读写放在内存中然后再通过writeFileSync读取 相对较慢且占用过多内存
// let data =fs.readFileSync('./7月25日.mp4');
// fs.writeFileSync('video-1.mp4',data);
//     // 内存占有量 看rss就好了
// console.log(process.memoryUsage());


//文件流读取    相对原始的来说 此方法可以减少内存使用情况
    //创建读取流对像
const rf = fs.createReadStream('./7月25日.mp4');
    //创建写入流对像
const wf = fs.createWriteStream('video-2.mp4');
    // 给写入流绑定事件
rf.on('data',chunk =>{
    wf.write(chunk);
});   
rf.on('end',()=>{
    // 内存占有量 看rss就好了
    console.log(process.memoryUsage());
});
