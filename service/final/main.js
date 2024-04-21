// 主文件 main.js
const express = require('express');
const bodyParser = require('body-parser');

// 引入封装模块
const lecturelogin = require('./lecturelogin');
const post_publishLecture = require('./post_publishLecture');
const post_userEdit = require('./post_user');
const upload_image = require('./upload_image');
const get_userInfo = require('./get_userInfo');
const get_lecturesInfo = require('./get_lecturesInfo');
const get_manageInfo = require('./get_manageInfo');
const post_manageInfo = require('./post_manageInfo');
const post_bookingInfo = require('./post_bookingInfo');

// 修改
const get_bookingInfo = require('./get_bookingInfo');


const app = express();
const port = 8080;

app.use(bodyParser.json());

  // 所有路由
// 用户登陆
app.use('/lecturelogin', lecturelogin);
// 用户发布讲座
app.use('/lecturesInfoSend', post_publishLecture);
// 上传图片
app.use('/uploadImage', upload_image);
// 获取讲座信息
app.use('/lecturesInfo', get_lecturesInfo);
// 获取个人信息
app.use('/userInfo', get_userInfo);
// 编辑个人信息
app.use('/userEdit', post_userEdit);
// 获取管理员信息
app.use('/manageInfo', get_manageInfo);
// 编辑管理员信息
app.use('/manageEdit', post_manageInfo);
// 上传预约
app.use('/booking', post_bookingInfo);
// 获取预约
app.use('/bookInfo', get_bookingInfo);




// 处理根路径的 GET 请求，返回一个简单的欢迎消息
app.get('/', (req, res) => {
    res.send('Welcome to Lecture App!');
  });

app.listen(port, () => {
  console.log(`Server is running on main. http://localhost:${port}`);
});
