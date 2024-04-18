// 引入 mysql 模块
const mysql = require('mysql');

// 创建 MySQL 数据库连接
const connection = mysql.createConnection({
  host: 'localhost', // MySQL 主机名
  user: 'root', // MySQL 用户名
  password: '123456', // MySQL 密码
  database: 'lecture' // 要连接的数据库名
});

// 连接到 MySQL 数据库
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL lecture database');
});

// 创建触发器
const createTriggerQuery = `
CREATE TRIGGER insert_time_trigger
BEFORE INSERT ON users
FOR EACH ROW
SET NEW.insert_time = NOW();
`;
// 在连接到 MySQL 数据库后执行创建触发器的操作
connection.query(createTriggerQuery, (error, results, fields) => {
    if (error) {
        console.error('Error creating trigger:', error);
        return;
    }
    console.log('Trigger created successfully');
});


// 插入管理员信息到 users 表
const adminInfo = {
  username: 'admin',
  student_id: '2006100147',
  college: 'admin_college'
};
connection.query('INSERT INTO users SET ?', adminInfo, (error, results, fields) => {
    if (error) {
      console.error('Error inserting admin info:', error);
      return;
    }
    console.log('Admin info inserted successfully');
    
    // 查询刚插入的数据并打印结果
    connection.query('SELECT * FROM users', (error, results, fields) => {
      if (error) {
        console.error('Error fetching admin info:', error);
        return;
      }
      console.log('Inserted admin info:', results);

      // 关闭 MySQL 数据库连接
    connection.end((err) => {
        if (err) {
        console.error('Error closing MySQL connection:', err);
        return;
        }
        console.log('MySQL connection closed');
    });
        });
  });
  
// 插入讲座信息到 lectures 表
const lectureInfo = {
  lecture_name: 'Introduction to AI',
  lecture_time: '2024-04-15 10:00:00',
  lecture_image_url: 'https://example.com/ai_lecture.jpg',
  location: 'Lecture Hall 101',
  latitude: 40.7128,
  longitude: -74.0060,
  // 可以添加其他讲座信息字段
};
connection.query('INSERT INTO lectures SET ?', lectureInfo, (error, results, fields) => {
  if (error) {
    console.error('Error inserting lecture info:', error);
    return;
  }
  console.log('Lecture info inserted successfully');
  
  // 查询刚插入的数据并打印结果
  connection.query('SELECT * FROM lectures', (error, results, fields) => {
    if (error) {
      console.error('Error fetching lecture info:', error);
      return;
    }
    console.log('Inserted lecture info:', results);

    // 关闭 MySQL 数据库连接
    connection.end((err) => {
      if (err) {
        console.error('Error closing MySQL connection:', err);
        return;
      }
      console.log('MySQL connection closed');
    });
  });
});
