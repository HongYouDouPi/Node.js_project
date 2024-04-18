// 同样引入fs模块
const fs =require('fs');
//修改名称
// fs.rename('./firstWord.txt','./firstword.txt',err=>{
//     if(err){
//         console.log("修改失败")
//         return
//     }
//     console.log("修改成功")
    
// })

//修改路径 其实原理也是一样不过就是在前面加上一些./XX/之类的
// fs.rename('./firstWord.txt','./移动文件/firstWord.txt',err=>{
//     if(err){
//         console.log("修改失败")
//         return
//     }
//     console.log("修改成功")
// })
// fs.renameSync('LeetCode-两数之和.js','./LeetCode/LeetCode-两数之和.js')

// //注意删除的文件不会出现在回收站！
// // 删除文件 方法一
// fs.unlink('./firstWord.txt',err=>{
//     if(err){
//         console.log("删除失败")
//         return
//     }
//     console.log("删除成功")
// })

// // 删除文件 方法二 nodejs14.4以上

// fs.rm('./firstword1.txt',err=>{
//     if(err){
//         console.log("删除失败")
//         return
//     }
//     console.log("删除成功")
// })

//创建文件夹 
    // 中间参数recursive用于递归创建文件夹
// fs.mkdir('./a/b/c',{recursive:true},err=>{
//     if(err){
//         console.log(err);
//         return;
//     }
//     console.log("创建成功1");
// })

const ccurrentDirname = 'test.js';
fs.writeFile(ccurrentDirname,'//写点东西',(err)=>{
    if(err){
        console.log("写入错误")
        return

    }
});
// fs.mkdir('./LeetCode',err=>{
//     if(err){
//         console.log(err,"错误2");
//         return;
//     }
//     console.log("创建成功2");
// })

// // 删除文件夹
// fs.rmdir('./b',err=>{
//     if(err){
//         console.log(err);
//         return
//     }
//     console.log("删除成功");

// })
