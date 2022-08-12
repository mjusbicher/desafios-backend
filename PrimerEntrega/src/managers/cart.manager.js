import * as fs from 'fs';
import __dirname from '../utils.js';
import ProductManager from './product.manager.js';

const productService = new ProductManager();

class CartManager {
    constructor() {
        this.path = __dirname + '/files/carts.json';
    }
    getAll = async () => {
        try {
            if (fs.existsSync(this.path)) {
                let fileData = await fs.promises.readFile(this.path, 'utf-8');
                let carts = JSON.parse(fileData);
                return carts
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }
    addProductCart = async (cid, pid, quantity) => {
        let product = await productService.getProductById(pid);
        if(product === null){
            throw new Error(`Cart manager error: ${addProductCart} the product doesn't exist`);
        }else{
            try {
                let cart = await this.getCartById(cid);
                if(cart.products.some(e =>e.id === pid)){
                    for (const item of cart.products){
                        if(item.id === pid){
                            let condition = (item.quantity += quantity);
                            if(condition < 1){
                                item.quantity = 1;
                            }else{
                                item.quantity = condition;
                            };
                        };
                    };
                }else{
                    if(quantity < 1){
                        throw new Error(`Cart manager error: ${addProductCart} invalid quantity`);
                    }else{
                        cart.products.push({id:pid, quantity});
                    };
                };
                await this.updateCarts(cart);
            } catch (error) {
                console.log(`Cart manager error: ${addProductCart} could be cart doesn't exist yet`);
                console.log(error);
            };
        };
    };
    deleteProductCart = async (cid, pid) => {
        let cart = await this.getCartById(cid);
        let newCartProduts = [];
        if(cart.products.some(e =>e.id === pid)){
            for (const item of cart.products){
                if(item.id === pid){
                    continue
                };
                newCartProduts.push(item);
            };
        };
        cart.products = newCartProduts;
        await this.updateCarts(cart);
    };
    createCart = async ()=>{
        let array_carts = await this.getAll();
        let cart={};
        if (array_carts.length === 0) {
            cart.id = 1;
            product.time_stamp = Date.now().toLocaleString();
        }else{
            cart.id= array_carts[array_carts.length - 1].id + 1;
            product.time_stamp = Date.now().toLocaleString();
        };
        cart.products = [];
        array_carts.push(cart);

        await fs.promises.writeFile(this.path, JSON.stringify(array_carts, null, '\t'));
        return cart.id;
    };
    getCartById = async (id) => {
        try {
            let carts = await this.getAll();
            let cart = null;
            for (const item of carts) {
                if (item.id === id) {
                    return item;
                };
            };
            return cart;
        } catch (error) {
            console.log(error);
        };
    };
    deleteCardById = async (id) => {
        try {
            let carts = await this.getAll();
            let newCarts = [];
            for (const item of carts) {
                if (item.id === id) {
                    continue
                };
                newCarts.push(item);
            };
            await fs.promises.writeFile(this.path, JSON.stringify(newCarts, null, '\t'));
        } catch (error) {
            console.log(error);
        };
    };
    deleteAll = async () => {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify([], null, '\t'));
        } catch (error) {
            console.log(error);
        };
    };
    updateCarts = async (cart)=>{
        try {
            let arrayCarts = await this.getAll();
            let newCarts = [];
            for(const item of arrayCarts){
                if(item.id===cart.id){
                    newCarts.push(cart);
                    continue
                };
                newCarts.push(item);
            };
            await fs.promises.writeFile(this.path, JSON.stringify(newCarts, null, '\t'));
        } catch (error) {
            console.log(error);
        };
    };
    getProductCart = async (cid)=>{
        console.log(cid);
        try {
            let cart = await this.getCartById(cid);
            let copyList = [];
            for(const item of cart.products){
                copyList.push(
                    {
                    product:await productService.getProductById(item.id),
                    quantity:item.quantity
                    }
                );
            };
            return copyList;
        } catch (error) {
            console.log(error);
        };
    };


};

export default CartManager;