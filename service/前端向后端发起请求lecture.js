// 引入所需模块
const express = require('express');

// 创建 Express 应用
const app = express();

// 定义端口号
const PORT = 9000;

// 配置中间件，用于解析请求体中的 JSON 数据
app.use(express.json());

// 定义 POST 请求的端点
app.post('/lectures', (req, res) => {
    // 从请求体中获取数据
    const lectureName = req.body.lectureName;
    const lectureDate = req.body.lectureDate;
    // 其他字段类似地获取

    // 处理接收到的数据，这里简单地将数据打印到控制台
    console.log('Received lecture data:');
    console.log('Lecture Name:', lectureName);
    console.log('Lecture Date:', lectureDate);
    // 其他字段类似地处理

    // 发送响应
    res.status(200).json({ message: 'Lecture data received successfully' });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
