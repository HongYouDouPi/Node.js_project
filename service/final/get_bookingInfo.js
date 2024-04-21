const mysql = require('mysql')
const cors = require('cors')
const express = require('express')

const router = express.Router();
router.use(cors());
// 添加解析请求体的中间件
router.use(express.json());

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'lecture'
})


// 查找当前的用户是否预约
router.get('/', (req, res) => {
    const data = req.query;

    let studentId = data.student_id;
    let style = data.style;
    // console.log('style',studentId,style)
    // 查询 bookings 表中含有当前 studentId 的项
    const baseQuery = `SELECT lecture_id FROM bookings WHERE student_id = ?`;
    let query = '';
    if (style == 'all') {
        query = baseQuery;
        console.log('style == all')
        // console.log(lecturesResults)
    } else if (style == 'finish') {
        query = baseQuery + ' AND join_status = 1';
        console.log('style == finish')
    } else if (style == 'jion') {
        //这里筛选lecture中join_status = 0的 然后返回给前端
        query = baseQuery + ' AND join_status = 0';
        console.log('style == jion')
    }
    pool.query(query, [studentId], (error, results) => {
        if (error) {
            console.error('Error searching bookings:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        // 提取所有的 lecture_id
        const lectureIds = results.map(result => result.lecture_id);
        console.log(lectureIds.length);
        if (lectureIds.length > 0) {
            // 使用 lectureIds 查询 lectures 表
            const lecturesQuery = `SELECT * FROM lectures WHERE lecture_id IN (?)`;
            pool.query(lecturesQuery, [lectureIds], (lecturesError, lecturesResults) => {
                if (lecturesError) {
                    console.error('Error searching lectures:', lecturesError);
                    res.status(500).json({ error: 'Mysql error searching lectures' });
                    return;
                }
                // 将查询结果发送给前端

                res.json({ lecture: lecturesResults });
            });
        }
        else
            res.json({});
    });
})

module.exports = router;