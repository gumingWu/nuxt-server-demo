import { createServer } from 'node:http'

const server = createServer((req, res) => {
  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/html')
    res.end('<h1>hi, im http</h1>')
  }
})

server.listen(9999, () => {
  console.log('Server is running on: http://localhost:9999')
})
