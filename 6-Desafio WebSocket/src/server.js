import express from 'express';
import { Server as HttpServer  } from 'http';
import { Server as IOServer} from 'socket.io';
import productsController from './controller/products.js';
import messagesController from './controller/chatMessages.js'

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.set('views', 'src/views')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', (req, res) => {
  try {
    res.sendFile(process.cwd() + '/public/index.html')
  } catch (error) {
    console.log(`ERROR: ${error}`)
  }
})

io.on('connection', (socket) => {
  socket.emit('socketConnected')

  socket.on('productListRequest', async () => {
    const allProducts = await productsController.getAllProduct()
    socket.emit('updateProductList', allProducts)
  })

  socket.on('addNewProduct', async (newProduct) => {
    await productsController.addNewProduct(newProduct)
    const allProducts = await productsController.getAllProduct()
    io.sockets.emit('updateProductList', allProducts)
  })

  socket.on('chatMessagesRequest', async () => {
    const allMessages = await messagesController.getAllMessages()
    socket.emit('updateChatRoom', allMessages)
  })

  socket.on('addNewMessage', async (newMessage) => {
    await messagesController.addNewMessage(newMessage)
    const allMessages = await messagesController.getAllMessages()
    io.sockets.emit('updateChatRoom', allMessages)
  })
})

const server = httpServer.listen(8080, () => {
  console.log('Server running on port 8080')
})
server.on('error', (error) => console.log(`Server error: ${error}`))
