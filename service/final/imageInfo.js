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
})

router.post('/add', (req, res) => {
    // ���һ��ǰ�˷�������url���� ��images��image_url��image_delurl��ֵ
})

router.post('/del', (req, res) => {
    // ɾ��ǰ�˷�������image_id����

})

module.exports = router