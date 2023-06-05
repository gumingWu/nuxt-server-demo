import { createServer } from 'node:http'
import { createApp, eventHandler, toNodeListener } from 'h3'
import { listen } from 'listhen'
import { loading } from '@nuxt/ui-templates'

const app = createApp()
app.use('/', eventHandler(() => '<h1>hi, im h3</h1>'))

// createServer(toNodeListener(app)).listen(8888, () => {
//   console.log('Server is running on: http://localhost:8888')
// })

await listen(toNodeListener(app), {
  port: 8888,
  showURL: true,
  open: false,
  clipboard: true,
})

// const loadingListener = (req, res) => {
//   res.setHeader('Content-Type', 'text/html; charset=UTF-8')
//   res.statusCode = 503
//   res.end(loading({ loading: 'Starting' }))
// }
// let currentListener
// const serverHandler = (req, res) => {
//   return currentListener ? currentListener(req, res) : loadingListener(req, res)
// }

// await listen(serverHandler, {
//   port: 8888,
//   showURL: true,
//   open: false,
//   clipboard: true,
// })

// // ! 需要找出如何修改listener的拦截器
// setTimeout(() => {
//   currentListener = toNodeListener(app)
// }, 5000)
