/*
 * @Author: 苏征辉 343196323@qq.com
 * @Date: 2024-02-28 22:11:58
 * @LastEditors: 苏征辉 343196323@qq.com
 * @Description: 
 */
import mysql2 from 'mysql2/promise';
import fs from 'node:fs';
import jsyaml from 'js-yaml';
import express from 'express';

// 读取yaml为字符串
const yaml = fs.readFileSync('./db.config.yaml', 'utf8');
// 将其解析成对象
const config = jsyaml.load(yaml);

const sql = await mysql2.createConnection({
  ...config.db
})

const app = express();
app.use(express.json());
// 查询接口 全部数据
app.get('/', async (req, res) => {
  const [data] = await sql.query('SELECT * FROM user');
  res.send(data)
})
// 单个查询
app.get('/user/:id', async (req, res) => {
  const [row] = await sql.query('SELECT * FROM user WHERE id = ?', [req.params.id])
  res.send(row)
})
// 新增接口
app.post('/create', async (req, res) => {
  const { name, age, address, hobby } = req.body;
  await sql.query('INSERT INTO user (name, age, address, hobby) VALUES (?, ?, ?, ?)', [name, age, address, hobby])
  res.send({ ok: 1 })
})
// 编辑接口
app.post('/update', async (req, res) => {
  const { name, age, address, hobby, id } = req.body
  await sql.query(`update user set name = ?,age = ?,address= ?,hobby = ? where id = ?`, [name, age, address, hobby, id])
  res.send({ ok: 1 })
})
//删除
app.post('/delete', async (req, res) => {
  await sql.query(`delete from user where id = ?`, [req.body.id])
  res.send({ ok: 1 })
})
const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});