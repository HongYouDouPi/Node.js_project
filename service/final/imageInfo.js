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

router.get('/', (req, res) => {
    //��pool�е� images���ѯ���е� �� ������ ��ǰ��
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
    // ���һ��ǰ�˷�������url���� ��images��image_url��image_delurl��ֵ
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
    // ɾ��ǰ�˷�������image_id����
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