import {Router} from "express";
import objectContenedor from "../contenendor/object.js";

const router = Router();
const objectService = new objectContenedor();
router.get('/',(req,res)=>{
    res.render('welcome')
})

router.get('/newObject', (req,res)=>{
    res.render('newObject');
})

router.get('/object',async(req,res)=>{
    let object = await objectService.getAll();
    res.render('object',{
        object,
        name: "Julian"
    });
})

export default router;
