const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mysql = require('mysql');
// const app = express();
const cors = require('cors');
// const port = 8080; //端口号

// 配置中间件
// 解析请求体中的 JSON 数据
router.use(bodyParser.json());
// 允许跨域请求
router.use(cors());

// 创建 MySQL 连接池
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'lecture'
});

// 处理登录请求
router.post('/', (req, res) => {
  const userdata = req.body;
  console.log('收到的用户数据',userdata)
  var student_id = userdata.student_id
  var password = userdata.password
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('mysql connect error:', err);
      res.status(500).send('mysql error');
      return;
    }
    // 查询用户是否存在
    connection.query('SELECT * FROM users WHERE student_id = ?', [student_id], (error, results) => {
      connection.release(); // 释放连接，以防止连接泄露
      if (error) {
        console.error('select student_id error:', error);
        res.status(500).send('mysql error');
        return;
      }
      // 处理查询结果
      if (results.length === 0) {
        // 如果用户不存在，插入新用户
        createUser(connection, userdata, res);
      } else {
        // 如果用户存在，检查密码是否匹配
        checkPassword(results[0], password, res);
      }
    });
  });
});

// 插入新用户并响应
function createUser(connection, userdata, res) {
  connection.query('INSERT INTO users SET ?', userdata, (err, result) => {
    if (err) {
      console.error('插入用户错误:', err);
      res.status(500).send('inset users error');
      return;
    }
    // res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.send('sign up sucessful');
  });
}
// 检查密码并响应
function checkPassword(user, password, res) {
  if (user.password === password) {
    // res.send('sign in success');
    // 查询用户的其他信息
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('mysql connect error:', err);
        res.status(500).send('mysql error');
        return;
      }
      connection.query('SELECT * FROM users WHERE student_id = ?', [user.student_id], (error, results) => {
        connection.release(); // 释放连接
        if (error) {
          console.error('select user info error:', error);
          res.status(500).send('mysql error');
          return;
        }
        if (results.length === 0) {
          res.status(404).send('User not found');
        } else {
          const userInfo = results[0];
          res.status(200).json(userInfo); // 返回用户信息
          return;
        }
      });
    });
  } else {
    // 密码错误返回401
    res.status(401).send('The username or password is incorrect!');
  }
}

module.exports = router;