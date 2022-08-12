import express from 'express';
import usersRouter from './routes/users.router.js';
import productsRouter from './routes/products.router.js'

const app = express();
const server = app.listen(8080,() => console.log('Listening on port 8080'));

app.use((req, res, next) => {
  let user = req.query.user;
  if(!user) return res.status(401).send({error:"No autorizado"})
  next();
})

app.use(express.json());
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use(express.static('public'));