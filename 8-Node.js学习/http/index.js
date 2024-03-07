/*
 * @Author: 苏征辉 343196323@qq.com
 * @Date: 2023-12-22 10:24:25
 * @LastEditors: 苏征辉 343196323@qq.com
 * @Description: 
 */
const http = require('node:http'); // 引入 http 模块
const url = require('node:url'); // 引入 url 模块

// 创建 HTTP 服务器，并传入回调函数用于处理请求和生成响应
http.createServer((req, res) => {
    const { pathname, query } = url.parse(req.url, true); // 解析请求的 URL，获取路径和查询参数

    if (req.method === 'POST') { // 检查请求方法是否为 POST
        if (pathname === '/post') { // 检查路径是否为 '/post'
            let data = '';
            req.on('data', (chunk) => {
                data += chunk; // 获取 POST 请求的数据
                console.log(data);
            });
            req.on('end', () => {
                res.setHeader('Content-Type', 'application/json'); // 设置响应头的 Content-Type 为 'application/json'
                res.statusCode = 200; // 设置响应状态码为 200
                res.end(data); // 将获取到的数据作为响应体返回
            });
        } else {
            res.setHeader('Content-Type', 'application/json'); // 设置响应头的 Content-Type 为 'application/json'
            res.statusCode = 404; // 设置响应状态码为 404
            res.end('Not Found'); // 返回 'Not Found' 作为响应体
        }
    } else if (req.method === 'GET') { // 检查请求方法是否为 GET
        if (pathname === '/get') { // 检查路径是否为 '/get'
            console.log(query.a); // 打印查询参数中的键名为 'a' 的值
            res.end('get success'); // 返回 'get success' 作为响应体
        }
    }
}).listen(98, () => {
    console.log('server is running on port 98'); // 打印服务器启动的信息
});

