// ��������ģ��
const express = require('express');

// ���� Express Ӧ��
const app = express();

// ����˿ں�
const PORT = 9000;

// �����м�������ڽ����������е� JSON ����
app.use(express.json());

// ���� POST ����Ķ˵�
app.post('/lectures', (req, res) => {
    // ���������л�ȡ����
    const lectureName = req.body.lectureName;
    const lectureDate = req.body.lectureDate;
    // �����ֶ����Ƶػ�ȡ

    // ������յ������ݣ�����򵥵ؽ����ݴ�ӡ������̨
    console.log('Received lecture data:');
    console.log('Lecture Name:', lectureName);
    console.log('Lecture Date:', lectureDate);
    // �����ֶ����Ƶش���

    // ������Ӧ
    res.status(200).json({ message: 'Lecture data received successfully' });
});

// ����������
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
