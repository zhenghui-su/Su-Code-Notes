#!/usr/bin/env node
import { program } from 'commander'
import inquirer from 'inquirer'
import fs from 'node:fs'
import { checkPath, downloadTemp } from './utils.js'
let json = fs.readFileSync('./package.json', 'utf-8')
json = JSON.parse(json)

program.version(json.version) //创建版本号
//添加create 命令 和 别名crt 以及描述 以及 执行完成之后的动作
program.command('create <project>').alias('ctr').description('create a new project').action((project) => {
    //命令行交互工具
    inquirer.prompt([
        {
            type: 'input',
            name: 'projectName',
            message: 'project name',
            default: project
        },
        {
            type: 'confirm',
            name: 'isTs',
            message: '是否支持typeScript',
        }
    ]).then((answers) => {
        if (checkPath(answers.projectName)) {
            console.log('文件已存在')
            return
        }

        if (answers.isTs) {
            downloadTemp('ts', answers.projectName)
        } else {
            downloadTemp('js', answers.projectName)
        }
    })
})

program.parse(process.argv)