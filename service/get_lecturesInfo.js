// 需要的模块
const express = require('express')
const mysql = require('mysql')
const cors = require('cors');
// const port = 8080;

const router = express.Router();
// 设置中间件
router.use(cors());

// 创建数据库连接池
const pool = mysql.createPool({
    connectionLimit : 10,
    host : 'localhost',
    user : 'root',
    password : '123456',
    database : 'lecture'
})

// 从数据库中查询讲座信息 返回给data再返回给前端
router.get('/',(req,res)=>{
    pool.query('SELECT * FROM lectures',(error,result)=>{
        if(error){
            console.error('mysql - select error',error);
            res.status(500).json({error})
        }
        else{
            console.log('mysql - select successful');
            // 结果返回给前端
            res.json({result})
        }
    })
})

// // 最新讲座
// router.get('/new',(req,res)=>{

// }

// // 最热讲座
// router.get('/hot',(req,res)=>{

// }

module.exports = router;
