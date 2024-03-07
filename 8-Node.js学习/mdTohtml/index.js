/*
 * @Author: 苏征辉 343196323@qq.com
 * @Date: 2023-12-20 16:16:42
 * @LastEditors: 苏征辉 343196323@qq.com
 * @Description: 
 */
const ejs = require('ejs'); // 导入ejs库，用于渲染模板
const fs = require('node:fs'); // 导入fs模块，用于文件系统操作
const marked = require('marked'); // 导入marked库，用于将Markdown转换为HTML
const readme = fs.readFileSync('README.md'); // 读取README.md文件的内容
const browserSync = require('browser-sync'); // 导入browser-sync库，用于实时预览和同步浏览器
const openBrowser = () => {
    const browser = browserSync.create()
    browser.init({
        server: {
            baseDir: './',
            index: 'index.html',
        }
    })
    return browser
}
ejs.renderFile('template.ejs', {
    content: marked.parse(readme.toString()),
    title: 'markdown to html'
}, (err, data) => {
    if (err) {
        console.log(err)
    }
    let writeStream = fs.createWriteStream('index.html')
    writeStream.write(data)
    writeStream.close()
    writeStream.on('finish', () => {
        openBrowser()
    })
})     