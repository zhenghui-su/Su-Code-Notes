import express from 'express';

const app = express();

const whitelist = ['localhost'];

// 防止热链中间件
const preventHotLinking = (req, res, next) => {
    const referer = req.get('referer'); // 获取请求头部中的 referer 字段
    if (referer) {
        const { hostname } = new URL(referer); // 从 referer 中解析主机名
        if (!whitelist.includes(hostname)) { // 检查主机名是否在白名单中
            res.status(403).send('Forbidden'); // 如果不在白名单中，返回 403 Forbidden
            return;
        }
    }
    next(); // 如果在白名单中，继续处理下一个中间件或路由
};

app.use(preventHotLinking); // 应用防止热链中间件
app.use('/assets', express.static('static')); // 处理静态资源请求

app.listen(3000, () => {
    console.log('Listening on port 3000'); // 启动服务器，监听端口3000
});
