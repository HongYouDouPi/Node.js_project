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

// ����������
const createTriggerQuery = `
CREATE TRIGGER insert_time_trigger
BEFORE INSERT ON users
FOR EACH ROW
SET NEW.insert_time = NOW();
`;
// �����ӵ� MySQL ���ݿ��ִ�д����������Ĳ���
connection.query(createTriggerQuery, (error, results, fields) => {
    if (error) {
        console.error('Error creating trigger:', error);
        return;
    }
    console.log('Trigger created successfully');
});


// �������Ա��Ϣ�� users ��
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
    
    // ��ѯ�ղ�������ݲ���ӡ���
    connection.query('SELECT * FROM users', (error, results, fields) => {
      if (error) {
        console.error('Error fetching admin info:', error);
        return;
      }
      console.log('Inserted admin info:', results);

      // �ر� MySQL ���ݿ�����
    connection.end((err) => {
        if (err) {
        console.error('Error closing MySQL connection:', err);
        return;
        }
        console.log('MySQL connection closed');
    });
        });
  });
  
// ���뽲����Ϣ�� lectures ��
const lectureInfo = {
  lecture_name: 'Introduction to AI',
  lecture_time: '2024-04-15 10:00:00',
  lecture_image_url: 'https://example.com/ai_lecture.jpg',
  location: 'Lecture Hall 101',
  latitude: 40.7128,
  longitude: -74.0060,
  // �����������������Ϣ�ֶ�
};
connection.query('INSERT INTO lectures SET ?', lectureInfo, (error, results, fields) => {
  if (error) {
    console.error('Error inserting lecture info:', error);
    return;
  }
  console.log('Lecture info inserted successfully');
  
  // ��ѯ�ղ�������ݲ���ӡ���
  connection.query('SELECT * FROM lectures', (error, results, fields) => {
    if (error) {
      console.error('Error fetching lecture info:', error);
      return;
    }
    console.log('Inserted lecture info:', results);

    // �ر� MySQL ���ݿ�����
    connection.end((err) => {
      if (err) {
        console.error('Error closing MySQL connection:', err);
        return;
      }
      console.log('MySQL connection closed');
    });
  });
});
