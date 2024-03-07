/*
 * @Author: 苏征辉 343196323@qq.com
 * @Date: 2024-01-10 10:41:47
 * @LastEditors: 苏征辉 343196323@qq.com
 * @Description: 
 */
import { execSync } from "child_process";

const nodeVersion = execSync('node -v')
console.log(nodeVersion.toString("utf-8"))

execSync("start chrome http://www.baidu.com --incognito")