const persistence = "FileSystem";
let productService;
let cartService;
switch (persistence) {
  case "MEMORY":
    const { default: MemProduct } = await import("./MemoryDAO/Products.js");
    productService = new MemProduct();
    cartService = new MemProduct();
    break;
  case "MONGO":
    const { default: MongoProduct } = await import("./MongoDAO/Products.js");
    productService = new MongoProduct();
    cartService = new MongoCart();
    break;
  case "FileSystem":
    const { default: FSProduct } = await import("./FileSystemDAO/Products.js");
    const { default: FSCart } = await import("./FileSystemDAO/Carts.js");
    productService = new FSProduct();
    cartService = new FSCart();
    break;
}

const services = {
  productService,
  cartService, 
};

export default services;
