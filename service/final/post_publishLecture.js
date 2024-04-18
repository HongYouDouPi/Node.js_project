// 引入 express 框架
const express = require('express');
const router = express.Router(); // 创建路由对象
// const app = express();
const bodyParser = require('body-parser');
// 引入 mysql 模块
const mysql = require('mysql');

// 解析请求体中的 JSON 数据
router.use(bodyParser.json());


// 创建 MySQL 数据库连接
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'lecture'
});

// 处理 POST 请求，将讲座信息插入到数据库
router.post('/', (req, res) => {
  const lectureData = req.body;
  // 将前端传递过来的日期和时间字符串转换为 MySQL DATETIME 格式
  // lectureData.lectureDateTime = lectureData.lecture_time + ' ' + lectureData.lectureTime;
  // console.log("插入的时间", lectureData.lecture_time);
  console.log("插入的讲座信息", lectureData);


  // 将经纬度转换为 DECIMAL 类型
  lectureData.latitude = parseFloat(lectureData.latitude);
  lectureData.longitude = parseFloat(lectureData.longitude);

  // 执行插入操作到数据库
  pool.query('INSERT INTO lectures SET ?', lectureData, (error, results) => {
    if (error) {
      console.error('Error inserting lecture info:', error);
      res.status(500).json({ message: 'Error inserting lecture info' });
      return;
    }
    console.log('LectureInfo inserted successfully');
    res.status(200).json({ message: 'Lecture info inserted successfully' });
  });
});

// 导出路由对象
module.exports = router;

