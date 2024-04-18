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

// 定义一个路由来获取单个管理员信息
router.get('/', (req, res) => {
    const manage_id = req.query.manage_id;
      // 确保manage_id存在
      if (!manage_id) {
        return res.status(400).json({ error: 'No manage_id provided' });
    }
    // 从 MySQL 数据库中查询用户信息
    pool.query('SELECT * FROM manages WHERE manage_id = ?',[manage_id], (error, results) => {
        if (error) {
            console.error('Failed to fetch lectures.manage:', error);
            res.status(500).json({ error: 'Failed to fetch lectures.manage' });
        } else {
            const manageInfo = results[0];
            if (manageInfo) {
                res.json(manageInfo);
            } else {
                res.status(404).json({ error: 'manage not found' });
            }
        }
    });
});

// 定义一个路由来获取所有用户信息
router.get('/all', (req, res) => {
    // 从 MySQL 数据库中查询所有用户信息
    pool.query('SELECT * FROM manages', (error, results) => {
        if (error) {
            console.error('Failed to fetch all manages:', error);
            res.status(500).json({ error: 'Failed to fetch all manages' });
        } else {
            console.log('Fetch all manages successful');
            res.json(results);
        }
    });
});

// // 启动服务器
// app.listen(port, () => {
//     console.log(`Server is running on http://127.0.0.1:${port}/`);
// });

module.exports = router;