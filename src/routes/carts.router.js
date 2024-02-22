import { Router } from "express";
import { 
    findCartsController, 
    findByIdCartController, 
    createCartController, 
    addProductToCartController,
    purchaseCartController, 
    deleteByIdCartController, 
    deleteProductFromCartController 
} from "../controllers/carts.controller.js";

//DESDE import { roleRequired, loginRequired } from "../middleware/auth.middleware.js"; obtener

const router = Router();

router.get("/", /*loginRequired,*/ findCartsController);

router.get("/:idCart", /*loginRequired,*/ findByIdCartController);
//agregar una vista en /carts/:idCart que solo debe mostrar los productos del carrito especifico

router.get("/:cid/purchase", purchaseCartController);
/*
VERIFICAR DONDE VA LA RUTA CURRENT Y MODIFICARLA PARA EVITAR QUE ENVIE INFORMACION SENSIBLE, ENVIAR UN DTO DEL USUARIO SOLO CON LA INFORMACION NECESARIA.
*/ 

router.post("/", /*loginRequired,*/ createCartController);

router.post("/:idCart/products/:idProduct", /*loginRequired,*/ /*roleRequired("user"),*/addProductToCartController);

router.delete("/:idCart", /*loginRequired,*/ deleteByIdCartController);

router.delete("/idCart/products/:idProduct", /*loginRequired,*/ deleteProductFromCartController);

export default router;


// router.get("/", async (req,res) => {
//     try {
//         const carts = await cartsManager.getCarts();
//         return res.status(200).json({ message: "Carritos", carts });
//     } catch (error) {
//         return res.status(500).json({message: error.message});
//     }
// })

// router.get("/:cid", async (req, res) => {
//     const {cid} = req.params;
//     try {
//         const cartById = await cartsManager.getCartById(+cid);

//         if (cartById) {

//             const productsWithQuantitiesInCart = cartById.products.map(product => ({
//                 id: product.id,
//                 quantity: product.quantity
//             }));
//             return res.status(200).json({
//                 message: `Carrito con el id ${cid} encontrado. Sus productos son:`,
//                 products: productsWithQuantitiesInCart
//             });
//         } else {
//             return res.status(400).json({message: `Código de Error 404. Carrito con id: ${cid} no encontrado.`});
//         }
//     } catch (error) {
//         return res.status(500).json({message: error.message});
//     }
// })

// /*
// Creación del carrito. Se modifica ya que la consigna indica que el carrito al ser creado no tendrá productos.
// */
// router.post('/', async (req, res) => {
//     try {
//         //const {products} = request.body
//         //if(products.length) {
//             const createdCart = await cartsManager.createCart(/*products*/)
//             console.log(createdCart)
//             return res.status(200).json({ message: `Carrito con el id ${createdCart.id} creado con éxito.`});
            
//         /*
//             } else {
//             return res.status(400).json({ message: "No hay producto, no se crea carrito." })    
//         }*/
//     } catch (error) {
//         return res.status(500).json({message: error.message});
//     }
// });

// /*
// La ruta POST /:cid/product/:pid deberá agregar el producto al arreglo products del carrito seleccionado:
// products -> contiene su id
// quantity -> contiene la cantidad del id producto especificado arriba
// */

// router.post("/:cid/product/:pid", async (req, res) => {
//     const {cid, pid} = req.params
//     let { quantity } = req.body 
//     //verifica si se envió cantidad, de lo contrario el método updateCart le asigna por defecto el valor 1.
//     /*
//     Quantity debe contener el numero de items del mismo producto. El producto de momento se agregará de uno en uno.
//     */
//     if(typeof quantity !== "number" || isNaN(quantity)) {
//            quantity = 1
//        }
//     try {
//         const updatedCart = await cartsManager.updateCart(+cid, +pid, quantity)
//         console.log("updatedCart", updatedCart)
//         if ( updatedCart ) {
//             return res.status(200).json({ message: `Del producto ${pid} se agregaron ${quantity} unidades al carrito ${cid} con éxito.` })
//         } else {
//             return res.status(404).json({ message: `No se encontro el carrito con el id ${cid}.` })
//         }
//     } catch (error) {
//         return res.status(500).json({message: error.message})
//     }
// })

