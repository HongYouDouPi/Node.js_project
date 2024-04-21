const mysql = require('mysql')
const cors = require('cors')
const express = require('express')

const router = express.Router();
router.use(cors());
// ��ӽ�����������м��
router.use(express.json());

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'lecture'
})


// ���ҵ�ǰ���û��Ƿ�ԤԼ
router.get('/', (req, res) => {
    const data = req.query;

    let studentId = data.student_id;
    let style = data.style;
    // console.log('style',studentId,style)
    // ��ѯ bookings ���к��е�ǰ studentId ����
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
        //����ɸѡlecture��join_status = 0�� Ȼ�󷵻ظ�ǰ��
        query = baseQuery + ' AND join_status = 0';
        console.log('style == jion')
    }
    pool.query(query, [studentId], (error, results) => {
        if (error) {
            console.error('Error searching bookings:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        // ��ȡ���е� lecture_id
        const lectureIds = results.map(result => result.lecture_id);
        console.log(lectureIds.length);
        if (lectureIds.length > 0) {
            // ʹ�� lectureIds ��ѯ lectures ��
            const lecturesQuery = `SELECT * FROM lectures WHERE lecture_id IN (?)`;
            pool.query(lecturesQuery, [lectureIds], (lecturesError, lecturesResults) => {
                if (lecturesError) {
                    console.error('Error searching lectures:', lecturesError);
                    res.status(500).json({ error: 'Mysql error searching lectures' });
                    return;
                }
                // ����ѯ������͸�ǰ��

                res.json({ lecture: lecturesResults });
            });
        }
        else
            res.json({});
    });
})

module.exports = router;