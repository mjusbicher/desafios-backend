import { Router } from "express";
import uploader from "../utils";

const router = Router();
const products = []

router.get('/', (req,res) => {

}) 

router.post('/', uploader.single(), (req,res) => {
  let product = req.body;
  console.log(product)
  if(product.name) res.status(400).send({status:"error"})
  products.push(product)
  res.send({status: "success", message:"product added"})
});

router.put('/:uid', (req,res) => {

})

router.delete('/:uid', (req,res) => {

})


export default router;
