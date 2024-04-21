// 引入 express 框架
const express = require('express');
const router = express.Router();
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
// const app = express();
// const bodyParser = require('body-parser');
// 引入 mysql 模块
// const mysql = require('mysql');
// const port = 8080;

// 配置 multer，设置上传的文件存储位置
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');  // 确保这个目录已经存在
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);  // 使用原文件名
  }
});
const upload = multer({ storage: storage });
// 在这里添加 Multer 中间件
router.use(upload.single('file'));

// 创建端点处理图片上传
router.post('/', async (req, res) => {
  console.log('file',req.file);
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  // 上传到图床
  const form = new FormData();
  form.append('file', fs.createReadStream(req.file.path));
  
  try {
    const response = await axios.post('https://www.freeimg.cn/api/v1/upload', form, {
      headers: {
        ...form.getHeaders(),
        'Authorization': 'Bearer 315|Si0Y3HfufBwbEG50XT02eMTS5ZK5kENEUcZ8iJaM',
        'Accept': 'application/json'
      }
    });

     // 输出图床 API 返回的信息到后端控制台
  console.log("图床 API 返回的信息:", response.data);

    // 删除服务器上的临时文件
    fs.unlinkSync(req.file.path);

    // 将响应返回到前端
    res.json(response.data);

  } catch (error) {
    console.error('服务器出错 Error during image upload:', error.response ? error.response.data : error.message);
    res.status(500).send('Error during image upload');
  }
});

module.exports = router;