// 引入框架
const express = require('express')
const mysql = require('mysql')

const app = express();

// 创建数据库连接
const connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'123456',
    database:'lecture'
})
connection.connect((err) =>{
    if(err){
        console.error('连接mysql错误')
        return
    }
    console.log('已连接到数据库')
})

// 离线插入的数据
const data =[
    {lecture_name: '宣讲会', student_id: 1, lecture_time: '2024-02-10 10:00:00', lecture_image_url: 'https://www.freeimg.cn/i/2024/01/31/65b9dea2d7399.jpg', location: '理科南', latitude: 22.938132047334456, longitude: 113.3845602733387, lecture_introduction: '快来看看准研究生们都具备哪些品质吧！(不超过25个字)', lecture_announcement: '欢迎大家参加宣讲会！'},
    {lecture_name: '茶话会', student_id: 2, lecture_time: '2024-02-11 12:00:00', lecture_image_url: 'https://www.freeimg.cn/i/2024/01/31/65b9de9f76e3b.jpg', location: '风雨走廊', latitude: 22.938132047334456, longitude: 113.3845602733387, lecture_introduction: '有你up的茶品嘛？', lecture_announcement: '欢迎大家参加茶话会！'},
    {lecture_name: '品牌会', student_id: 3, lecture_time: '2024-02-12 14:00:00', lecture_image_url: 'https://www.freeimg.cn/i/2024/01/31/65b9de9e09908.jpg', location: '北区篮球场', latitude: 22.938132047334456, longitude: 113.3845602733387, lecture_introduction: '这些品牌居然是黑榜！', lecture_announcement: '欢迎大家参加品牌会！'},
    {lecture_name: '研讨会', student_id: 4, lecture_time: '2024-02-13 16:00:00', lecture_image_url: 'https://www.freeimg.cn/i/2024/01/31/65b9de9bc4c2d.jpg', location: '理科北', latitude: 22.938132047334456, longitude: 113.3845602733387, lecture_introduction: '俗话说:俗话说的好！', lecture_announcement: '欢迎大家参加研讨会！'},
    {lecture_name: '茶话会', student_id: 5, lecture_time: '2024-02-11 18:00:00', lecture_image_url: 'https://www.freeimg.cn/i/2024/01/31/65b9de9d992d7.jpg', location: '文俊楼', latitude: 22.938132047334456, longitude: 113.3845602733387, lecture_introduction: '有你up的茶品嘛？', lecture_announcement: '欢迎大家参加茶话会！'},
    {lecture_name: '品牌会', student_id: 6, lecture_time: '2024-02-12 20:00:00', lecture_image_url: 'https://www.freeimg.cn/i/2024/01/31/65b9de9c64d6f.jpg', location: '田径场', latitude: 22.938132047334456, longitude: 113.3845602733387, lecture_introduction: '这些品牌居然是黑榜！', lecture_announcement: '欢迎大家参加品牌会！'}
];

// 依次插入到数据库
data.forEach((lecture)=>{
    connection.query('insert into lectures set ?',lecture,(err,res,fields)=>{
        if(err){
            console.error("插入失败",err);
            return;
        }
        console.log("插入成功")
    })
})


// 断开连接
connection.end;