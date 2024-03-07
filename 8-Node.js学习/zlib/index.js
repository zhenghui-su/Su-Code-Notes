/*
 * @Author: 苏征辉 343196323@qq.com
 * @Date: 2023-12-21 09:45:57
 * @LastEditors: 苏征辉 343196323@qq.com
 * @Description: 
 */
// 引入所需的模块
const zlib = require('zlib'); // zlib 模块提供数据压缩和解压缩功能
const fs = require('node:fs'); // 引入 Node.js 的 fs 模块用于文件操作

// // 创建可读流和可写流
// const readStream = fs.createReadStream('index.txt'); // 创建可读流，读取名为 index.txt 的文件
// const writeStream = fs.createWriteStream('index.txt.gz'); // 创建可写流，将压缩后的数据写入 index.txt.gz 文件

// // 使用管道将可读流中的数据通过 Gzip 压缩，再通过管道传输到可写流中进行写入
// readStream.pipe(zlib.createGzip()).pipe(writeStream)
// 解压
// const readStream = fs.createReadStream('index.txt.gz')
// const writeStream = fs.createWriteStream('index2.txt')
// readStream.pipe(zlib.createGunzip()).pipe(writeStream)

// deflate压缩
// const readStream = fs.createReadStream('index.txt'); // 创建可读流，读取名为 index.txt 的文件
// const writeStream = fs.createWriteStream('index.txt.deflate'); // 创建可写流，将压缩后的数据写入 index.txt.deflate 文件
// readStream.pipe(zlib.createDeflate()).pipe(writeStream);
// 解压
// const readStream = fs.createReadStream('index.txt.deflate')
// const writeStream = fs.createWriteStream('index3.txt')
// readStream.pipe(zlib.createInflate()).pipe(writeStream)

// http压缩deflate
// const zlib = require('zlib'); 
// const http = require('node:http'); 
// const server = http.createServer((req,res)=>{
//     const txt = 'susu'.repeat(1000);

//     //res.setHeader('Content-Encoding','gzip')
//     res.setHeader('Content-Encoding','deflate')
//     res.setHeader('Content-type','text/plan;charset=utf-8')
   
//     const result = zlib.deflateSync(txt);
//     res.end(result)
// })

// server.listen(3000)

// http压缩gzip
// const zlib = require('zlib'); 
// const http = require('node:http'); 
// const server = http.createServer((req,res)=>{
//     const txt = 'susu'.repeat(1000);

//     res.setHeader('Content-Encoding','gzip')
//     //res.setHeader('Content-Encoding','deflate')
//     res.setHeader('Content-type','text/plan;charset=utf-8')
   
//     const result = zlib.gzipSync(txt);
//     res.end(result)
// })

// server.listen(3000)