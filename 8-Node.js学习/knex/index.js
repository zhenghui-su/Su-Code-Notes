// import mysql2 from 'mysql2/promise';
import fs from 'node:fs';
import jsyaml from 'js-yaml';
import express from 'express';
import knex from 'knex';

// 读取yaml为字符串
const yaml = fs.readFileSync('./db.config.yaml', 'utf8');
// 将其解析成对象
const config = jsyaml.load(yaml);

// const sql = await mysql2.createConnection({
//   ...config.db
// })
const db = knex({
  client: 'mysql2',
  connection: config.db
})
// knex所有代码直接编写是没有效果的,必须then后才会有效果
db.schema.createTableIfNotExists('list', table => {
  table.increments('id') // id 主键 自增
  table.integer('age') // age 整数
  table.string('name') // name 字符串
  table.string('hobby') // hobby 字符串
  table.timestamps(true, true) // 创建时间 更新时间
}).then(() => {
  console.log('创建成功')
})

const app = express();
app.use(express.json());
//查询接口 全部
app.get('/', async (req, res) => {
  const data = await db('list').select().orderBy('id', 'desc')
  const total = await db('list').count('* as total')
  res.json({
      code: 200,
      data,
      total: total[0].total,
  })
})
//单个查询 params
app.get('/user/:id', async (req, res) => {
  const row = await db('list').select().where({ id: req.params.id })
  res.json({
      code: 200,
      data: row
  })
})
//新增接口
app.post('/create', async (req, res) => {
  const { name, age, hobby } = req.body
  const detail = await db('list').insert({ name, age, hobby })
  res.send({
      code: 200,
      data: detail
  })
})
//编辑接口
app.post('/update', async (req, res) => {
  const { name, age, hobby, id } = req.body
  const info = await db('list').update({ name, age, hobby }).where({ id })
  res.json({
      code: 200,
      data: info
  })
})
//删除接口
app.post('/delete', async (req, res) => {
  const info = await db('list').delete().where({ id: req.body.id })
  res.json({
      code: 200,
      data: info
  })
})

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});