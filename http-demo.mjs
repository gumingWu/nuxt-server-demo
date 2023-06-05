import { createServer } from 'node:http'

// 初始服务器
// const server = createServer((req, res) => {
//   if (req.url === '/') {
//     res.setHeader('Content-Type', 'text/html')
//     res.end('<h1>hi, im http</h1>')
//   }
// })

// server.listen(9999, () => {
//   console.log('Server is running on: http://localhost:9999')
// })

// 新增get请求
// const server = createServer((req, res) => {
//   if (req.url === '/') {
//     res.setHeader('Content-Type', 'text/html')
//     res.end(`\
//     <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta http-equiv="X-UA-Compatible" content="IE=edge">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Document</title>
// </head>
// <body>
//   <h1>hi, im http</h1>
//   <button id="button">get请求</button>

//   <script>
//     const button = document.getElementById('button')
//     button.addEventListener('click', () => {
//       const request = new XMLHttpRequest()
//       request.open('GET', 'http://localhost:9999/user')
//       request.send()
//     })
//   </script>
// </body>
// </html>
//     `)
//   }
//   if (req.url === '/user') {
//     res.setHeader('Content-Type', 'application/json')
//     res.end(JSON.stringify({
//       name: 'wu',
//       age: 18,
//     }))
//   }
// })
// server.listen(9999, () => {
//   console.log('Server is running on: http://localhost:9999')
// })

// 新增post请求
const server = createServer((req, res) => {
  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/html')
    res.end(`\
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
  <button id="post">post请求</button>

  <script>
    const get = document.getElementById('get')
    get.addEventListener('click', () => {
      const request = new XMLHttpRequest()
      request.open('GET', 'http://localhost:9999/user')
      request.send()
    })

    const post = document.getElementById('post')
    post.addEventListener('click', () => {
      const request = new XMLHttpRequest()
      request.open('POST', 'http://localhost:9999/post')
      request.send(JSON.stringify({ // 这里带请求参数
        name: 'wu',
      }))
    })
  </script>
</body>
</html>
    `)
  }
  if (req.url === '/user') {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({
      name: 'wu',
      age: 18,
    }))
  }
})

server.on('request', (req, res) => {
  if (req.url === '/post' && req.method === 'POST') {
    const body = []
    req.on('data', (chunk) => {
      body.push(chunk)
    }).on('end', () => {
      console.log(Buffer.concat(body).toString())
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({
        name: 'wu',
        age: 18,
      }))
    })
  }
})

server.listen(9999, () => {
  console.log('Server is running on: http://localhost:9999')
})
