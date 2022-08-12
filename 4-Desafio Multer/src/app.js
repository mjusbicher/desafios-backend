import express from 'express'
import productosRouter from './routers/productos.router.js'

const app = express()
const server = app.listen(8080,()=>console.log('Listening on port 8080'));

app.use(express.json());
app.use('/api/productos',productosRouter);
app.use(express.static('src/public'));