import express from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const app = express()
const port: number = 3000

app.use(express.json())

//关联查找
app.get('/', async (req, res) => {
    const data = await prisma.user.findMany({
        include: {
            posts: true
        }
    })
    res.send(data)
})
//单个查找
app.get('/user/:id', async (req, res) => {
   const row =  await prisma.user.findMany({
        where: {
            id: Number(req.params.id)
        }
    })
    res.send(row)
})
//新增
app.post('/create', async (req, res) => {
    const { name, email } = req.body
    const data = await prisma.user.create({
        data: {
            name,
            email,
            posts: {
                create: {
                    title: '标题',
                    publish: true
                },
            }
        }
    })
    res.send(data)
})

//更新
app.post('/update', async (req, res) => {
    const { id, name, email } = req.body
    const data = await prisma.user.update({
        where: {
            id: Number(id)
        },
        data: {
            name,
            email
        }
    })
    res.send(data)
})

//删除
app.post('/delete', async (req, res) => {
    const { id } = req.body
    await prisma.post.deleteMany({
        where: {
            authorId: Number(id)
        }
    })
    const data = await prisma.user.delete({
        where: {
            id: Number(id),
        },
    })
    res.send(data)
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})
