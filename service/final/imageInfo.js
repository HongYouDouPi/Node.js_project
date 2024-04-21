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
})

router.post('/add', (req, res) => {
    // 添加一个前端发过来的url对像 给images的image_url和image_delurl赋值
})

router.post('/del', (req, res) => {
    // 删除前端发过来的image_id的项

})

module.exports = router