import { Router } from "express";
import Contenedor from "../managers/productsContainer.js";
import services from "../dao/index.js";
import validatePid from "../middlewares/validatePid.js";

const router = Router();
const container = new Contenedor();

router.get("/", async (req, res) => {
  console.log("Ahora desde persistencias");
  let getAllProducts = await services.productService.getAll();
  res.send(getAllProducts);
});

router.get("/:id", async (req, res) => {
  let allProducts = await services.productService.getAll();
  let id1 = Number(req.params.id);
  let item = allProducts.find((item) => item.id === id1);
  item ? res.send(item) : res.send("404 El valor pedido no existe");
});

router.post("/", async (req, res) => {
  let product = req.body;
  console.log(req.body);
  res.send({ status: "succes", message: "Product Added" });
  await services.productService.save(product);
});

router.put("/:pid", validatePid, async (req, res) => {
  let id = Number(req.params.pid);
  let products = await services.productService.update(req.body, id);
  res.send(products);
});

router.delete("/:pid", validatePid, async (req, res) => {
  let pid = parseInt(req.params.pid);
  await services.productService.deleteById(pid);
  res.send({ status: `Product with id: ${pid} has been deleted` });
});

export default router;
