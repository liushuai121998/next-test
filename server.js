const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const router = require('koa-router')()
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()
app.prepare().then(() => {
    const server = new Koa()
    server.use(bodyParser())
    // async await 
    router.get('/p/:id', async (ctx, next) => {
        const actualPage = '/post'
        const queryParams = {
            title: ctx.params.id
        }
        await app.render(ctx.req, ctx.res, actualPage, queryParams)
        ctx.response = false
    })
    router.get('*', async (ctx, next) => {
        await handle(ctx.req, ctx.res)
        ctx.response = false
    })
    server.use(async (ctx, next) => {
        ctx.res.statusCode = 200
        await next()
    })
    server.use(router.routes())
    server.listen(3000, (err) => {
        if(err) throw err
        console.log('> Ready on http://localhost:3000')
    })
}).catch(ex => {
    console.error(ex.stack)
    process.exit(1)
})

// express 方式

// const express = require('express')
// const next = require('next')
// const dev = process.env.NODE_ENV !== 'production'
// const app = next({ dev })
// const handle = app.getRequestHandler()

// app.prepare().then(() => {
//   const server = express()

//   server.get('/p/:id', (req, res) => {
//     const actualPage = '/post'
//     const queryParams = { 
//         title: req.params.id 
//     } 
//     app.render(req, res, actualPage, queryParams)
//   })

//   server.get('*', (req, res) => {
//     return handle(req, res)
//   })

//   server.listen(3000, (err) => {
//     if (err) throw err
//     console.log('> Ready on http://localhost:3000')
//   })
// }).catch((ex) => {
//   console.error(ex.stack)
//   process.exit(1)
// })