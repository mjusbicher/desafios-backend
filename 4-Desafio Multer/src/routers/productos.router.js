import { Router } from "express";
import Manager from "../Manager/contenedor.js"
const manager  = new Manager();
const router = Router();

///GET '/api/productos' -> devuelve todos los productos.

router.get('/',async(req,res)=>{
    let getData = await manager.getAllProducts()
    res.send(getData);
})

//GET '/api/productos/:id' -> devuelve un producto según su id.

router.get('/:id',async(req,res)=>{
    const productById = await manager.getById(req.params.id);
    console.log(productById)
    if (req.params.id != productById.id) {
        res.send("404 El valor pedido no existe")
    } else {
        res.send(productById)
    }
})

//POST '/api/productos' -> recibe y agrega un producto.

router.post('/',async(req,res)=>{
    let producto = req.body
    res.send({status:"succes", message:"Product Added"})
    await manager.addProduct(producto)
})

//PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.

router.put('/:id',async(req,res)=>{
    await manager.update(req.params.id, req.body);
})


//DELETE '/api/productos/:id' -> elimina un producto según su id.
router.delete('/',async(req,res)=>{
    let id = req.body
    res.send("Eliminado")
    await manager.deleteById(id.delete)
})





export default router;