import { createServer } from 'node:http'
import { createApp, eventHandler, toNodeListener, createRouter } from 'h3'

const app = createApp()
app.use('/', eventHandler(() => '<h1>hi, im h3</h1>'))

createServer(toNodeListener(app)).listen(8888, () => {
  console.log('Server is running on: http://localhost:8888')
})
