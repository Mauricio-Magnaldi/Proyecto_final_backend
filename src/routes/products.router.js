import { Router } from "express";
import { 
    findController, 
    findProductsController, 
    findByIdProductController, 
    createProductController, 
    updateProductController, 
    deleteProductController 
} from "../controllers/products.controller.js";
//DESDE import {loginRequired , roleRequired} from "../middleware/auth.middleware.js"; obtener
// import { errorMiddleware } from "../errors/error.middleware.js";
// import CustomeError from "../errors/custome.error.js";
// import { ErrorMessages } from "../errors/error.dictionary.js";
import { generateProduct } from "../utils/faker.js";

const router = Router();

router.get("/", /*loginRequired,*/ findController);
  //=> {
//      CustomeError.createError(ErrorMessages.PRODUCTS_NOT_FOUND);
// });

router.get("/mockingproducts", (req, res, next)=> {
    const products = [];
    for (let i=0 ; i<100; i++) {
        products.push(generateProduct());
    }
    res.json(products);
})

router.get("/ap", /*loginRequired,*/findProductsController);

router.get("/:idProduct", /*loginRequired,*/findByIdProductController);

router.post("/", /*loginRequired, roleRequired*/createProductController);

router.put("/:idProduct", /*loginRequired,*/updateProductController);

router.delete("/:idProduct", /*loginRequired,*/deleteProductController);

//Se prueba desde la extensión Thunder Client en VSC -> get -> body -> json

//router.use(errorMiddleware);

export default router;

