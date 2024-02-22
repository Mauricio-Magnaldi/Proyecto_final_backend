import {
    addProductToCartService,
    deleteProductFromCartService,
    findByIdCartService,
    findCartFromUserService,
    //findBuysOfUserService,
    //productInCartService, 
    purchaseCartService
} from "../services/carts.service.js";
import { productsModel as Product } from "../models/products.model.js";
import { customeResponse } from "../utils/utils.js";
import { errors } from "../errors/error.dictionary.js";

//OK
////POST http://localhost:8080/api/carts/:idCart/products/:idProduct 
//POST http://localhost:8080/api/carts/65ca2fea5d94445b528d7e5a/products/65b344b3988f9e776a786662
export const addProductToCartController = async (req, res, next) => {
    try {
        const {idCart, idProduct} = req.params;
        const result = await addProductToCartService(idCart, idProduct);
        if (!result) {
            return customeResponse(res, 404, "Producto no agregado al carrito.");
        }
        return customeResponse(res, 200, "Producto agregado al carrito.");    
    } catch (error) {
        return next(error);
    }
};

//OK
export const deleteProductFromCartController = async (req, res, next) => {
    try {
        const {idCart, idProduct} = req.params;
        const result = await deleteProductFromCartService(idCart, idProduct);
        if (!result) {
            return customeResponse(res, 404, "Producto no eliminado del carrito.");
        }
        return customeResponse(res, 200, "Producto eliminado del carrito.");
    } catch (error) {
        return next(error);
    }
};

//OK  getCartById
export const findByIdCartController = async (req, res, next) => {
    try {
        const {idCart} = req.params;
        const result = await findByIdCartService(idCart);
        if (!result) {
            return customeResponse(res, 404, result);
        }
        return customeResponse(res, 200, result);
    } catch (error) {
        return next(error);
    }
};

export const createCartController = async (req, res) => {
    try {
        const cart = { products: [] };
        const result = await createCartService(cart); 
        if (!result) {
            return customeResponse(res, 404, "Carrito creado.");
        }
        return customeResponse(res, 200, "Carrito no creado.");
    } catch (error) {
        return next(error);
    }
}

//OK getCartByActiveUser
export const findCartFromUserController = async (req, res, next) => {
    try {
        const idUser = req.user.id;
        const result = await findCartFromUserService({
            where: {
                userId: idUser,
                bought: false,
            },
            include: [
                { 
                    model: Product,
                },
            ],
        });
        return customeResponse(res, 200, result);  
    } catch (error) {
        return next(error);
    }
};

export const findBuysOfUser = async (req, res, next) => {
    try {
        const idUser = req.user.id;
        const { startDate, endDate } = req.query;
        const result = await findBuysOfUserService(idUser, startDate, endDate);   
        if (!result) {
            return customeResponse(res, 404, result);
        }
        return customeResponse(res, 200, result);  
    } catch (error) {
        return next(error);
    }
};

export const productsInCartController = async (req, res, next) => {
    try {
        const { idCart, idProduct } = req.params;
        const result = await productInCartService(idCart, idProduct);
        if (!result) {
            return customeResponse(res, 404, result);
        }
        return customeResponse(res, 200, result); 
    } catch (error) {
        return next(error);
    }
};

export const purchaseCartController = async (req, res) => {
    try {
        const idUser = req.user.id;
        const {idCart} = req.params;
        const result = await purchaseCartService(idCart, idUser);
        if (!result) {
            return customeResponse(res, 404, "Carrito no comprado.");
        }
        return customeResponse(res, 200, "Carrito comprado.");
    } catch (error) {
        return next(error);
    }
};


export const deleteByIdCartController = async (req, res, next) => {
    try {
        const {idCart} = req.params;
        const result = await deleteCartService(idCart);
        if (!result) {
            return customeResponse(res, 404, "Carrito no eliminado.");
        }
        return customeResponse(res, 200, "Carrito eliminado.");
    } catch (error) {
        return next(error);
    }
}


export const findCartsController = async (req, res, next) => {
    try {
        const result = await findCartsService();
        if (!result) {
            return customeResponse(res, 404, result);
        }   
        return customeResponse(res, 200, result);  
    } catch (error) {
        return next(error);
    }
}
