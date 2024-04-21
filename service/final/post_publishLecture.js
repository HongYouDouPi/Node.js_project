// 引入 express 框架
const express = require('express');
const cors = require('cors')
const router = express.Router(); // 创建路由对象
// const app = express();
const bodyParser = require('body-parser');
// 引入 mysql 模块
const mysql = require('mysql');
const { route } = require('./post_user');

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
  const lectureData = req.body;
  console.log("插入的讲座信息", lectureData);

  // 将经纬度转换为 DECIMAL 类型
  lectureData.latitude = parseFloat(lectureData.latitude);
  lectureData.longitude = parseFloat(lectureData.longitude);

  // 执行插入操作到数据库
  pool.query('INSERT INTO lectures SET ?', lectureData, (error, results) => {
    if (error) {
      console.error('Error inserting lecture info:', error);
      res.status(500).json({ message: 'Error inserting lecture info' });
      return;
    }
    console.log('LectureInfo inserted successfully');
    res.status(200).json({ message: 'Lecture info inserted successfully' });
  });
});

router.post('/edit',(req,res) => {
  const LectureDataToUpdate = req.body.data;
  const lectureId = LectureDataToUpdate.lecture_id;

  delete LectureDataToUpdate.lecture_id;
  delete LectureDataToUpdate.lecture_image_delurl;
  delete LectureDataToUpdate.lecture_image_url;
  delete LectureDataToUpdate.lecture_time;
  delete LectureDataToUpdate.location;
  delete LectureDataToUpdate.longitude;
  delete LectureDataToUpdate.latitude;
  delete LectureDataToUpdate.style;

  console.log('要更新的lecture:',LectureDataToUpdate);

  const setString = Object.keys(LectureDataToUpdate).map(key => `${key} = ? `).join(', ');
  const values = [...Object.values(LectureDataToUpdate),lectureId];
  const updateQuery = `update lectures set ${setString} where lecture_id = ?`;

  pool.query(updateQuery,values,(error,results) => {
    if (error) {
      console.error('Error update lectureinfo:', error);
      res.status(500).json({ message: 'Error update lectureinfo' });
      return;
    }
    console.log('update lectureinfo successfully');
    res.status(200).json({ message: 'update lectureinfo successfully', results: results });
  })
})

router.post('/del',(req,res) => {
  const id = req.body.id;
  console.log('del lecture_id:',id);

  pool.query('delete from lectures where lecture_id = ?' , id ,(error,results) => {
    if (error) {
      console.error('Error del lectureinfo:', error);
      res.status(500).json({ message: 'Error del lectureinfo' });
      return;
    }
    console.log('del lectureinfo successfully');
    res.status(200).json({ message: 'del lectureinfo successfully', results: results });
  })
})
// 导出路由对象
module.exports = router;

