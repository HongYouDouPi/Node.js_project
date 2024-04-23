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

router.get('/', (req, res) => {
    //向pool中的 images表查询所有的 项 并返回 给前端
    pool.query('SELECT * FROM images', (error, results, fields) => {
        if (error) {
            console.error('Error fetching data from database:', error);
            res.status(500).json({ error: 'Error fetching data from database' });
            return;
        }
        res.json(results);
    });
})

router.post('/add', (req, res) => {
    // 添加一个前端发过来的url对像 给images的image_url和image_delurl赋值
    const { image_url, image_delurl } = req.body;
    console.log(req.body);
    if (!image_url || !image_delurl) {
        res.status(400).json({ error: 'Both image_url and image_delurl are required' });
        return;
    }
    pool.query('INSERT INTO images (image_url, image_delurl) VALUES (?, ?)', [image_url, image_delurl], (error, results, fields) => {
        if (error) {
            console.error('Error inserting data into database:', error);
            res.status(500).json({ error: 'Error inserting data into database' });
            return;
        }
        res.json({ message: 'Image added successfully' });
    });
})

router.post('/del', (req, res) => {
    // 删除前端发过来的image_id的项
    const { image_id } = req.body;
    if (!image_id) {
        res.status(400).json({ error: 'image_id is required' });
        return;
    }
    pool.query('DELETE FROM images WHERE image_id = ?', [image_id], (error, results, fields) => {
        if (error) {
            console.error('Error deleting data from database:', error);
            res.status(500).json({ error: 'Error deleting data from database' });
            return;
        }
        res.json({ message: 'Image deleted successfully' });
    });
})

module.exports = router