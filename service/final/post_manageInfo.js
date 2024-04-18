// 引入 express 框架
const express = require('express');
const router = express.Router(); // 创建路由对象
const bodyParser = require('body-parser');
const cors = require('cors')
// 引入 mysql 模块
const mysql = require('mysql');

// 解析请求体中的 JSON 数据
router.use(bodyParser.json());
// 处理跨域资源共享
router.use(cors());

// 创建 MySQL 数据库连接
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'lecture'
});

// 处理 POST 请求，将讲座信息插入到数据库
router.post('/add', (req, res) => {
    // 需要加入的数据
    const manageInfo = req.body;
    console.log('check add.req.body:', manageInfo);
    pool.query('insert into manages set ?', manageInfo, (error, results) => {
        if (error) {
            console.log('insert manage error:', error);
            res.status(500).json({ message: 'insert manage error' })
            return;
        }
        console.log('insert manage successful');
        res.status(200).json({ message: 'insert manage successful' })

    })
})

router.post('/edit', (req, res) => {
    // 需要更新的数据
    const manageDataToUpdate = req.body.data;
    // 取出 manage_id insert_time 并从更新对象中删除，因为我们不更新它们
    const manageId = manageDataToUpdate.manage_id;
    delete manageDataToUpdate.manage_id;
    delete manageDataToUpdate.insert_time;
    // 构建更新字符串和参数
    const setString = Object.keys(manageDataToUpdate).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(manageDataToUpdate), manageId];
    // SQL 更新语句
    const updateQuery = `UPDATE manages SET ${setString} WHERE manage_id = ?`;

    console.log('需要更新的管理员数据', manageDataToUpdate);
    console.log('执行的SQL', updateQuery);
    console.log('使用的值', values);
    
    pool.query(updateQuery, values, (error, results) => {
        if (error) {
            console.error('更新管理员信息错误:', error);
            res.status(500).json({ message: 'Update manage error' });
        } else {
            console.log('更新管理员信息成功', results);
            res.status(200).json({ message: 'Update manage successful', results });
        }
    });

});

router.post('/del', (req, res) => {
    const delId = req.body;
    console.log('需要删除的管理员数据', delId);
    pool.query()

})

// 导出路由对象
module.exports = router;

