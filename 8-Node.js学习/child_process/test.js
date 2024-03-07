/*
 * @Author: 苏征辉 343196323@qq.com
 * @Date: 2024-01-10 10:53:55
 * @LastEditors: 苏征辉 343196323@qq.com
 * @Description: 
 */
process.on('message', (data) => {
    console.log('子进程接受消息：', data)
})

process.send('我是子进程')