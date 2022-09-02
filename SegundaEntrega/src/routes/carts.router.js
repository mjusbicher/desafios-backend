import { Router } from "express";
import Container from "../managers/cartsContainer.js";
import services from "../dao/index.js";
import validateCid from "../middlewares/validateCid.js";
import validatePid from "../middlewares/validatePid.js";

const router = Router();
const container = new Container();

router.get("/", async (req, res) => {
  let getAllCarts = await services.cartService.getAll();
  res.send(getAllCarts);
});

router.get("/:cid/products", validateCid, async (req, res) => {
  try {
    let cid = Number(req.params.cid);
    let products = await services.cartService.getProductsByCid(cid);
    res.send({ products });
  } catch (error) {
    return res
      .status(500)
      .send({ status: "error", error: "Products couldn't be shown" });
  }
});

router.post("/", async (req, res) => {
  res.send({ status: "succes", message: "Cart Added" });
  await services.cartService.save();
});

router.post("/:cid/products", validatePid, async (req, res) => {
  await services.cartService.addProductsToCart(req);
  res.send({
    status: `${req.body.quantity} units of the product with id: ${req.body.id} were added to the cart`,
  });
});

router.delete("/:cid", async (req, res) => {
  let cid = req.params.cid;
  await container.deleteById(cid);
  res.send({ status: `Cart with id '${cid}' has been deleted` });
});
export default router;

router.delete("/:cid/products/:pid", async (req, res) => {
  let cid = req.params.cid;
  let pid = req.params.pid;
  await container.deleteProductInCart(cid, pid);
  res.send({
    status: `The product id:${pid} from the cart id:${cid} was deleted`,
  });
});
