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

    console.log('sql', sql, 'value', values);
    // 执行更新操作
    pool.query(sql, values, (error, results) => {
      if (error) {
        console.error('Error inserting lecture info:', error);
        res.status(500).json({ message: 'Error inserting lecture info' });
        return;
      }
      console.log('LectureInfo inserted successfully');
      res.status(200).json({ message: 'Lecture info inserted successfully', results: results });

    });
  } else {
    console.log('没有可更新的用户信息');
  }
});

// 后台添加用户
router.post('/add', (req, res) => {
  const userdata = req.body.data;
  console.log('收到的用户数据', userdata);
  pool.query('insert into users set ?', userdata, (error, results) => {
    if (error) {
      console.error('插入用户错误:', error);
      res.status(500).send('inset users error');
      return;
    }
    res.status(200).send('sign up sucessful');
  })
})

router.post('/edit', (req, res) => {

  const userDataToUpdate = req.body.data;
  const userId = userDataToUpdate.user_id;

  delete userDataToUpdate.user_id;
  delete userDataToUpdate.email;
  delete userDataToUpdate.gender;
  delete userDataToUpdate.phone_number;
  delete userDataToUpdate.email;
  delete userDataToUpdate.insert_time;
  delete userDataToUpdate.my_image_url;
  delete userDataToUpdate.college;

  console.log('传过来的后台user更新:', userDataToUpdate)

  // 构建更新字符串和参数
  const setString = Object.keys(userDataToUpdate).map(key => `${key} = ?`).join(', ');
  const values = [...Object.values(userDataToUpdate), userId];
  // SQL 更新语句
  const updateQuery = `UPDATE users SET ${setString} WHERE user_id = ?`;

  console.log('需要更新的用户数据', userDataToUpdate);
  console.log('执行的SQL', updateQuery);
  console.log('使用的值', values);

  // 执行更新操作
  pool.query(updateQuery, values, (error, results) => {
    if (error) {
      console.error('Error update userinfo:', error);
      res.status(500).json({ message: 'Error update userinfo' });
      return;
    }
    console.log('update userinfo successfully');
    res.status(200).json({ message: 'update userinfo successfully', results: results });
  });
});

router.post('/del',(req,res) =>{
  const id = req.body.id;
  console.log('del userid:',id)
  pool.query('delete from users where user_id = ?',id , (error,results) => {
    if (error) {
      console.error('Error del userinfo:', error);
      res.status(500).json({ message: 'Error del userinfo' });
      return;
    }
    console.log('del userinfo successfully');
    res.status(200).json({ message: 'del userinfo successfully', results: results });
  })
})
// 导出路由对象
module.exports = router;

