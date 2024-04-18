// ���� express ���
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// ���� mysql ģ��
const mysql = require('mysql');

// ���� MySQL ���ݿ�����
const connection = mysql.createConnection({
  host: 'localhost', // MySQL ������
  user: 'root', // MySQL �û���
  password: '123456', // MySQL ����
  database: 'lecture' // Ҫ���ӵ����ݿ���
});

// ���ӵ� MySQL ���ݿ�
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL lecture database');
});

// �����������е� JSON ����
app.use(bodyParser.json());

// �����·���� GET ���󣬷���һ���򵥵Ļ�ӭ��Ϣ
app.get('/', (req, res) => {
  res.send('Welcome to Lecture App!');
});

app.get('/lecturesInfoSend', (req, res) => {
  res.send('Hello from lecturesInfoSend route!');
});

// ���� POST ���󣬽�������Ϣ���뵽���ݿ�
app.post('/lecturesInfoSend', (req, res) => {
  const lectureData = req.body;
  // ��ǰ�˴��ݹ��������ں�ʱ���ַ���ת��Ϊ MySQL DATETIME ��ʽ
  // lectureData.lectureDateTime = lectureData.lecture_time + ' ' + lectureData.lectureTime;
  console.log("�����ʱ��", lectureData.lecture_time);

  // ����γ��ת��Ϊ DECIMAL ����
  lectureData.latitude = parseFloat(lectureData.latitude);
  lectureData.longitude = parseFloat(lectureData.longitude);

  // ִ�в�����������ݿ�
  connection.query('INSERT INTO lectures SET ?', lectureData, (error, results, fields) => {
    if (error) {
      console.error('Error inserting lecture info:', error);
      res.status(500).json({ message: 'Error inserting lecture info' });
      return;
    }
    console.log('LectureInfo inserted successfully');
    res.status(200).json({ message: 'Lecture info inserted successfully' });
  });
});

// ����ָ���˿�
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`You can send lectureInfo to MySQL. || Server is running on port ${PORT}`);
});
