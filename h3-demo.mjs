import { createServer } from 'node:http'
import { createApp, createRouter, eventHandler, readBody, toNodeListener } from 'h3'
import { listen } from 'listhen'

// 基础用法
// const app = createApp()
// app.use('/', eventHandler(() => '<h1>hi, im h3</h1>'))

// createServer(toNodeListener(app)).listen(8888, () => {
//   console.log('Server is running on: http://localhost:8888')
// })

// 使用路由
const app = createApp()

const route = createRouter()
route.get('/', eventHandler(() => `\
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>hi, im http</h1>
  <button id="get">get请求</button>
  <button id="idget">带有id的get请求</button>
  <button id="post">post请求</button>

  <script>
    const get = document.getElementById('get')
    get.addEventListener('click', () => {
      const request = new XMLHttpRequest()
      request.open('GET', 'http://localhost:8888/user')
      request.send()
    })

    const idget = document.getElementById('idget')
    idget.addEventListener('click', () => {
      const request = new XMLHttpRequest()
      request.open('GET', 'http://localhost:8888/user/111')
      request.send()
    })

    const post = document.getElementById('post')
    post.addEventListener('click', () => {
      const request = new XMLHttpRequest()
      request.open('POST', 'http://localhost:8888/post')
      request.send(JSON.stringify({
        name: 'wu',
      }))
    })
  </script>
</body>
</html>
`)).get('/user', eventHandler(() => ({
  name: 'wu',
  age: 18,
}))).get('/user/:id', eventHandler(event => ({
  name: 'wu',
  age: 18,
  id: event.context.params.id,
}))).post('/post', eventHandler(async (event) => {
  const body = await readBody(event)
  console.log(body) // { name: 'wu' }
  return {
    age: 18,
    ...body,
  }
}))

app.use(route)
// createServer(toNodeListener(app)).listen(8888, () => {
//   console.log('Server is running on: http://localhost:8888')
// })

listen(toNodeListener(app), {
  port: 8888,
  showURL: true,
  open: false,
  clipboard: true,
})
