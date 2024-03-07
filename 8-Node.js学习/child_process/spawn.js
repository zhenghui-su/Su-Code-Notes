/*
 * @Author: 苏征辉 343196323@qq.com
 * @Date: 2024-01-10 10:51:55
 * @LastEditors: 苏征辉 343196323@qq.com
 * @Description: 
 */
import { spawn } from 'child_process';
//                       命令      参数  options配置和上面一样
const { stdout } = spawn('netstat', ['-an'], {})

//返回的数据用data事件接受
stdout.on('data', (steram) => {
    console.log(steram.toString())
})
stdout.on('close', (msg) => {
    console.log('结束了')
})