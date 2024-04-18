const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

// 由于图片位于与脚本相同的目录中，只需直接使用文件名即可
const filePath = 'service\\Boy.png';

const uploadImageToFreeimg = async (filePath) => {
  const form = new FormData();
  form.append('file', fs.createReadStream(filePath));

  try {
    const response = await axios.post('https://www.freeimg.cn/api/v1/upload', form, {
      headers: {
        ...form.getHeaders(),
        'Authorization': 'Bearer 315|Si0Y3HfufBwbEG50XT02eMTS5ZK5kENEUcZ8iJaM',
        'Accept': 'application/json'
      }
    });
    
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error during image upload:', error.response ? error.response.data : error.message);
  }
};

uploadImageToFreeimg(filePath);
