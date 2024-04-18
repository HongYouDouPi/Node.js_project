// 引入 express 框架
const express = require('express');
const router = express.Router(); // 创建路由对象
const bodyParser = require('body-parser');
const cors = require('cors')
// 引入 mysql 模块
const mysql = require('mysql');

// 解析请求体中的 JSON 数据
router.use(bodyParser.json());
router.use(cors());

// 创建 MySQL 数据库连接
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'lecture'
});

// 处理 POST 请求，将讲座信息插入到数据库
router.post('/', (req, res) => {
  const userDataToUpdate = req.body;
  const student_id = userDataToUpdate.student_id;

  // 动态构建更新语句
let sql = 'UPDATE users SET ';
const updates = [];
const values = [];

for (const key in userDataToUpdate) {
  if (userDataToUpdate[key] != null) { // 确保只更新有实际值的字段
    updates.push(`${key} = ?`);
    values.push(userDataToUpdate[key]);
  }
}

// 检查是否有要更新的数据
if (updates.length > 0) {
  sql += updates.join(', ');
  sql += ' WHERE student_id = ?';
  values.push(student_id);

  console.log('sql',sql,'value',values);
  // 执行更新操作
  pool.query(sql, values, (error, results) => {
    if (error) {
      console.error('Error inserting lecture info:', error);
      res.status(500).json({ message: 'Error inserting lecture info' });
      return;
    }
    console.log('LectureInfo inserted successfully');
    res.status(200).json({ message: 'Lecture info inserted successfully' ,results : results});
    
  });
} else {
  console.log('没有可更新的用户信息');
}
});

// 后台添加用户
router.post('/add',(req,res) =>{
  const userdata = req.body.data;
  console.log('收到的用户数据',userdata);
  pool.query('insert into users set ?', userdata , (error,results) =>{
    if (error) {
      console.error('插入用户错误:', error);
      res.status(500).send('inset users error');
      return;
    }
    res.status(200).send('sign up sucessful');
  })
})
// 导出路由对象
module.exports = router;

