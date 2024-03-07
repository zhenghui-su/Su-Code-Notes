/*
 * @Author: 苏征辉 343196323@qq.com
 * @Date: 2024-01-10 10:38:58
 * @LastEditors: 苏征辉 343196323@qq.com
 * @Description: 
 */
import { exec } from 'node:child_process';

exec('node -v', (err, stdout, stderr) => {
    if (err) {
        return err
    }
    console.log(stdout.toString())
})