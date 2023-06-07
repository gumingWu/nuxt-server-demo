import { loading } from '@nuxt/ui-templates'
import { listen } from 'listhen'
import { createApp, eventHandler, toNodeListener } from 'h3'

// 第一部分
const app = createApp()
app.use('/', eventHandler(() => '<h1>hi, im nuxt</h1>'))

// 第二部分
const loadingListener = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=UTF-8')
  res.statusCode = 503
  res.end(loading({ loading: 'Starting' }))
}
let currentListener
const serverHandler = (req, res) => {
  return currentListener ? currentListener(req, res) : loadingListener(req, res)
}

// 第三部分
const listhener = await listen(serverHandler, {
  port: 8888,
  showURL: false,
  open: false,
  clipboard: true,
})

// 第四部分
function initNuxt() {
  const nuxtInstance = {
    ready: () => {
      // ! nuxt的准备过程，先用setTimeout模拟
      setTimeout(() => {
        // 创建真正的开发服务器
        currentListener = toNodeListener(app)
      }, 5000)
    },
  }
  listhener.showURL() // 执行到这里，展示url
  return nuxtInstance
}

// 这里进行nuxt初始化
const currentNuxt = initNuxt()
currentNuxt.ready()
