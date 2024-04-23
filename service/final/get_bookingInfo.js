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

// 后台显示所有的预约
router.use('/all', (req, res) => {
    let query = 'SELECT * FROM bookings'
    pool.query(query, (error, results) => {
        //将查询成功的结果返回给前端
        if (error) {
            console.error('select all bookingsInfo error')
            res.status(500).json({ error: 'select all bookingsInfo error' })
            return;
        }
        // console.error('select all bookingsInfo:',results)
        res.json(results);
    })
})

// 后台添加预约
router.post('/add', (req, res) => {
    let data = req.body.data;
    console.log(data);

    if (!data.student_id || !data.lecture_id) {
        res.status(400).json({ error: 'Both student_id and lecture_id are required' });
        return;
    }

    pool.query('INSERT INTO bookings (student_id ,lecture_id , join_status) VALUES (?, ?, ?) ', [data.student_id, data.lecture_id, 0], (error, results) => {
        if (error) {
            console.error('del bookingsInfo error')
            res.status(500).json({ error: 'del bookingsInfo error' })
            return;
        }
        console.error('del bookingsInfo', results)
        res.json({ message: 'Booking added successfully' });
    })
})

// 删除预约
router.post('/del', (req, res) => {
    let data = req.body;
    console.log(data);
    let id = data.id;

    if (!id) {
        res.status(400).json({ error: 'booking_id is required' });
        return;
    }

    //在bookings表中找到booking_id为id的值的项 删除
    let query = 'delete FROM bookings where booking_id = ?'
    pool.query(query, [id], (error, results) => {
        if (error) {
            console.error('del bookingsInfo error')
            res.status(500).json({ error: 'del bookingsInfo error' })
            return;
        }
        console.error('del bookingsInfo', results)
        res.json(results);
    })
})

router.get('/studentId', (req, res) => {
    let data = req.query;
    console.log('data.lecture_id,',data)
    let lecture_id = data.lecture_id;
    pool.query('Select * from bookings WHERE lecture_id = ?', lecture_id, (error, results) => {
        if (error) {
            console.error('Select * from bookings WHERE lecture_id error')
            res.status(500).json({ error: 'Select * from bookings WHERE lecture_id error' })
            return;
        }
        console.log('data.lecture_id,results',results)

        res.json(results);
    })
})

module.exports = router;