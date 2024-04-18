// 导入所需的模块和库
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const cors = require('cors');
// const port = 8080;

router.use(cors());

// 创建 MySQL 连接池
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'lecture'
});

// 定义一个路由来获取单个用户信息
router.get('/', (req, res) => {
    const student_id = req.query.student_id;
      // 确保studentId存在
      if (!student_id) {
        return res.status(400).json({ error: 'No student_id provided' });
    }
    // 从 MySQL 数据库中查询用户信息
    pool.query('SELECT * FROM users WHERE student_id = ?',[student_id], (error, results) => {
        if (error) {
            console.error('Failed to fetch lectures.users:', error);
            res.status(500).json({ error: 'Failed to fetch lectures.users' });
        } else {
            const userInfo = results[0];
            if (userInfo) {
                res.json(userInfo);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        }
    });
});

// 定义一个路由来获取所有用户信息
router.get('/all', (req, res) => {
    // 从 MySQL 数据库中查询所有用户信息
    pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
            console.error('Failed to fetch all users:', error);
            res.status(500).json({ error: 'Failed to fetch all users' });
        } else {
            console.log('Fetch all users successful');
            res.json(results);
        }
    });
});

// // 启动服务器
// app.listen(port, () => {
//     console.log(`Server is running on http://127.0.0.1:${port}/`);
// });

module.exports = router;