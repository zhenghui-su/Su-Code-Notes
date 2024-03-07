/*
 * @Author: 苏征辉 343196323@qq.com
 * @Date: 2024-01-18 15:48:19
 * @LastEditors: 苏征辉 343196323@qq.com
 * @Description: 
 */
/*
 *                   江城子 . 程序员之歌
 * 
 *               十年生死两茫茫，写程序，到天亮。
 *                   千行代码，Bug何处藏。
 *               纵使上线又怎样，朝令改，夕断肠。
 * 
 *               领导每天新想法，天天改，日日忙。
 *                   相顾无言，惟有泪千行。
 *               每晚灯火阑珊处，夜难寐，加班狂。
 * 
 */

const express = require('express')
const app = express()
const port = 3001

app.get('/info', (req, res) => {
    res.set('su', '1')
    res.json({
        code: 200
    })
})
app.use('*', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500') //允许localhost 5500 访问
    next()
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))