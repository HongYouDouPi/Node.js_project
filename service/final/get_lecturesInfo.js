// 需要的模块
const express = require('express')
const mysql = require('mysql')
const cors = require('cors');
// const port = 8080;

const router = express.Router();
// 设置中间件
router.use(cors());

// 创建数据库连接池
const pool = mysql.createPool({
    connectionLimit : 10,
    host : 'localhost',
    user : 'root',
    password : '123456',
    database : 'lecture'
})

// 从数据库中查询讲座信息 返回给data再返回给前端
router.get('/',(req,res)=>{
    // 检查是否有传递 lecture_id 参数
    console.log('请求路由为',req.query)
    const lectureId = req.query.lecture_id;
    if (lectureId) {
        // 如果有 lecture_id 参数，则只返回该 lecture_id 对应的讲座信息
        pool.query('SELECT * FROM lectures WHERE lecture_id = ?', [lectureId], (error, result) => {
            if (error) {
                console.error('mysql - select error', error);
                res.status(500).json({ error });
            } else {
                console.log(`mysql - select ${lectureId} successful`);
                // 结果返回给前端
                res.json({ result });
            }
        });
    } else {
        // 如果没有 lecture_id 参数，则返回所有讲座信息
        pool.query('SELECT * FROM lectures', (error, result) => {
            if (error) {
                console.error('mysql - select error', error);
                res.status(500).json({ error });
            } else {
                console.log('mysql - select successful');
                // 结果返回给前端
                res.json({ result });
            }
        });
    }
})

module.exports = router;
