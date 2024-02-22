import { 
    findService, 
    findProductsService, 
    findByIdProductService, 
    createProductService, 
    updateProductService, 
    deleteProductService 
} from "../services/products.service.js";
import { customeResponse } from "../utils/utils.js";
import { errors } from "../errors/error.dictionary.js";

export const findController = async (req, res, next) => {
    try {
        const result = await findService();
        if (!result) {
            return customeResponse(res, 404, errors.ProductsNotFoundError);
        }   
        return customeResponse(res, 200, result);  
    } catch (error) {
        return next(error);
    }
}

export const findProductsController = async (req, res, next) => {
    try {
        const result = await findProductsService(req.query);
        if (!result) {
            return customeResponse(res, 404, errors.ProductsNotFoundError);
        }   
        return customeResponse(res, 200, result);
    } catch (error) {
        return next(error);
    }
}

export const findByIdProductController = async (req, res, next) => {
    try {
        const {idProduct} = req.params;
        const result = await findByIdProductService(idProduct);
        if (!result) {
            return customeResponse(res, 404, result);
        }   
        return customeResponse(res, 200, result);
    } catch (error) {
        return next(error);
    }
}

export const createProductController = async (req, res, next) => {
    try {
        const { title, description, code, price, status, stock, category } = req.body;
        if (!title || !description || !code || !price || !status || !category) {
            return res.status(400).json({ message: "Todos los datos, excepto stock, son obligatorios." });
        }
        // //mongoose
        //// Defaults do **not** run on `null`, `''`, or value other than `undefined`.
        if(!stock) {
            delete req.body.stock;
        }
        const result = await createProductService(req.body);
        if (!result) {
            return customeResponse(res, 404, "Producto agregado.");
        }
        return customeResponse(res, 200, "Producto no agregado.");
    } catch (error) {
        return next(error);
    }
}

export const updateProductController = async (req, res, next) => {
    try {
        const idProduct = req.params.id;
        const result = await updateProductService(idProduct, req.body);
        if (!result) {
            return customeResponse(res, 404, "Producto no actualizado.");
        }
        return customeResponse(res, 200, "Producto actualizado.");
    } catch (error) {
        return next(error);
    }
}

export const deleteProductController = async (req, res, next) => {
    try {
        const {idProduct} = req.params;
        const result = await deleteProductService(idProduct);
        if (!result) {
            return customeResponse(res, 404, "Producto no eliminado.");
        }
        return customeResponse(res, 200, "Producto eliminado.");
    } catch (error) {
        return next(error);
    }
}



// //http://localhost:8080/api/products?sort=asc&limit=2&page=2
// POST http://localhost:8080/api/products
// No olvidar colocar entre comillas el valor boolean
// {
//     "title":"Musculosa",
//     "description":"color blanca",
//     "code":"sin marca",
//     "price":150,
//     "status":"false",
//     "category":"ropa",
//     "thumbnails":"no hay"
//   }
