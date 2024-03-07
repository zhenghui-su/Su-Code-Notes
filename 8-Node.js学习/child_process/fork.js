/*
 * @Author: 苏征辉 343196323@qq.com
 * @Date: 2024-01-10 10:53:34
 * @LastEditors: 苏征辉 343196323@qq.com
 * @Description: 
 */
import { fork } from 'child_process';

const testProcess = fork('./test.js')

testProcess.send('我是主进程')

testProcess.on("message", (data) => {
    console.log('我是主进程接受消息111：', data)
})