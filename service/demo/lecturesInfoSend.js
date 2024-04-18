// 引入 express 框架
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// 引入 mysql 模块
const mysql = require('mysql');

// 创建 MySQL 数据库连接
const connection = mysql.createConnection({
  host: 'localhost', // MySQL 主机名
  user: 'root', // MySQL 用户名
  password: '123456', // MySQL 密码
  database: 'lecture' // 要连接的数据库名
});

// 连接到 MySQL 数据库
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL lecture database');
});

// 解析请求体中的 JSON 数据
app.use(bodyParser.json());

// 处理根路径的 GET 请求，返回一个简单的欢迎消息
app.get('/', (req, res) => {
  res.send('Welcome to Lecture App!');
});

app.get('/lecturesInfoSend', (req, res) => {
  res.send('Hello from lecturesInfoSend route!');
});

// 处理 POST 请求，将讲座信息插入到数据库
app.post('/lecturesInfoSend', (req, res) => {
  const lectureData = req.body;
  // 将前端传递过来的日期和时间字符串转换为 MySQL DATETIME 格式
  // lectureData.lectureDateTime = lectureData.lecture_time + ' ' + lectureData.lectureTime;
  console.log("插入的时间", lectureData.lecture_time);

  // 将经纬度转换为 DECIMAL 类型
  lectureData.latitude = parseFloat(lectureData.latitude);
  lectureData.longitude = parseFloat(lectureData.longitude);

  // 执行插入操作到数据库
  connection.query('INSERT INTO lectures SET ?', lectureData, (error, results, fields) => {
    if (error) {
      console.error('Error inserting lecture info:', error);
      res.status(500).json({ message: 'Error inserting lecture info' });
      return;
    }
    console.log('LectureInfo inserted successfully');
    res.status(200).json({ message: 'Lecture info inserted successfully' });
  });
});

// 监听指定端口
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`You can send lectureInfo to MySQL. || Server is running on port ${PORT}`);
});
