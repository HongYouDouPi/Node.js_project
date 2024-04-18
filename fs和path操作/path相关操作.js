const fs =require('fs')
const path = require('path')

// 先获取当前文件路径
const currentPath=__dirname;
//这个能获取到路径和文件名字
const currentPathName=__filename;

// console.log(currentPath_1,currentPath_2)
//获取当前文件名字
const currentFileName = path.basename(currentPathName)
console.log(path.resolve(__filename));
console.log(`当前文件名字为${currentFileName}`)
