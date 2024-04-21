// 需要的模块
const express = require('express')
const mysql = require('mysql')
const cors = require('cors');
// const port = 8080;

const router = express.Router();
// 设置中间件
router.use(cors());
    // 添加解析请求体
router.use(express.json()); 

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
        // 开启一个特定连接
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('mysql - connection error', err);
                res.status(500).json({ error: err.message });
                return;
            }
            connection.beginTransaction(err => {
                if (err) {
                    console.error('mysql - beginTransaction error', err);
                    res.status(500).json({ error: err.message });
                    connection.release();
                    return;
                }
                // 查询特定的讲座信息
                connection.query('SELECT * FROM lectures WHERE lecture_id = ?', [lectureId], (error, results) => {
                    if (error) {
                        console.error('mysql - select error', error);
                        return connection.rollback(() => {
                            connection.release();
                            res.status(500).json({ error: error.message });
                        });
                    }

                    if (results.length > 0) {
                        const currentViewed = results[0].viewed;
                        const updateViewedSql = 'UPDATE lectures SET viewed = ? WHERE lecture_id = ?';
                        // 更新观看次数
                        connection.query(updateViewedSql, [currentViewed + 1, lectureId], (updateError) => {
                            if (updateError) {
                                console.error('mysql - update viewed error', updateError);
                                return connection.rollback(() => {
                                    connection.release();
                                    res.status(500).json({ error: updateError.message });
                                });
                            }
                            // 提交事务
                            connection.commit(commitErr => {
                                if (commitErr) {
                                    console.error('mysql - commit error', commitErr);
                                    return connection.rollback(() => {
                                        connection.release();
                                        res.status(500).json({ error: commitErr.message });
                                    });
                                }
                                console.log(`mysql - select and update ${lectureId} successful`);
                                connection.release();
                                // 返回结果
                                res.json({ result: results });
                            });
                        });
                    } else {
                        connection.release();
                        res.status(404).send('Lecture not found');
                    }
                });
            });
        });
    }
    else {
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


router.get('/jion',(req,res) =>{

})

router.get('/publish',(req,res) => {
    const id = req.query;
    console.log('id',id);
})
module.exports = router;
