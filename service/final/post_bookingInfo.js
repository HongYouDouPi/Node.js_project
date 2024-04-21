const mysql = require('mysql')
const cors = require('cors')
const express = require('express')

const router = express.Router();
router.use(cors());
// 添加解析请求体的中间件
router.use(express.json()); 

const pool = mysql.createPool({
    connectionLimit : 10,
    host : 'localhost',
    user : 'root',
    password : '123456',
    database : 'lecture'
})

function checkBookingExists(lectureId, studentId, callback) {
    const query = 'SELECT * FROM bookings WHERE lecture_id = ? AND student_id = ?';
    pool.query(query, [lectureId, studentId], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, results.length > 0);
    });
}

// 添加预约
router.post('/add',(req,res) => {
    const data = req.query;
    let studentId  = data.student_id;
    let lectureId  = data.lecture_id;
    // console.log('obtain data:',data,lecture_id,student_id);
    const queryLecture = 'SELECT lecture_name FROM lectures WHERE lecture_id = ?';
    pool.query(queryLecture,lectureId,(error,results) => {
        if (error) {
            // 处理查询错误
            console.error('Error fetching lecture name:', error);
            res.status(500).send('Booking Error');
            return;
        }
        if (results.length === 0) {
            // 没有找到讲座
            res.status(404).send('Lecture not found');
            return;
        }
        const lectureName  = results[0].lecture_name;

        // 然后，插入预约信息
        const insertBooking = 'INSERT INTO bookings (student_id, lecture_id, jion_status,lecture_name) VALUES (?, ?, ? , ?)';

        pool.query(insertBooking, [studentId, lectureId, 0 ,lectureName], (error, results) => {
            if (error) {
                // 处理插入错误
                console.error('Error inserting booking:', error);
                res.status(500).send('Internal Server Error');
                return;
            }

            // 插入成功
            console.log(`${studentId} Booking ${lectureId}  successful`);

            res.status(200).send('Booking successful');
        });
    })
})

// 取消预约
router.post('/del',(req,res) => {
    const data = req.query;
    let studentId = data.student_id;
    let lectureId = data.lecture_id;
    // console.log('obtain data:',data,lecture_id,student_id);
    const delLecture = 'delete from bookings where lecture_id = ? AND user_id = ?';
    pool.query(delLecture,[lectureId,studentId],(error,results) => {
        if (error) {
            // 处理查询错误
            console.error('Error del lecture:', error);
            res.status(500).send('del Error');
            return;
        }
        // 检查是否有行受到影响
        if (results.affectedRows === 0) {
            res.status(404).send('Booking not found');
            return;
        }
        console.log(results);
        res.status(200).send('DelBooking successful');
    })
})

// 查找当前的用户是否预约
router.get('/search',(req,res) => {
    const data = req.query;
    console.log('search booking data',data)
    let studentId = data.student_id;
    let lectureId = data.lecture_id;
    if(studentId&&lectureId){
        checkBookingExists(lectureId, studentId, (error, exists) => {
            if (error) {
                // 处理错误
                console.log('searchBooking error');
                return res.status(500).send('searchBooking error');
            }
            if (!exists) {
                console.log(`${studentId} Booking ${lectureId} not exist`)
                let isBooking = false;
                return res.json({isBooking});
            } else {
                // 预约存在
                console.log(`${studentId} Booking ${lectureId} exist`)
                let isBooking = true;
                return res.json({isBooking});
            }
        });
    }
    else{
        let isBooking = true;
        console.log('studentId&&lectureId error');
        return res.status(501).send('searchBooking error').json({isBooking});
    }
})

module.exports = router;