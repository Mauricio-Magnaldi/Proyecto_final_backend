//import { productsManager } from "../persistencia/dao/fileDao/productsManager.js";
import { productsDao } from "../persistencia/daos/mongoDao/products.dao.js";

export const findService = () => {
    const products = productsDao.findAll();
    return products;
}

export const findByIdProductService = (id) => {
    const product = productsDao.findById(id);
    return product;
}

export const findProductsService = (options) => {
    const products = productsDao.findAllProducts(options);
    return products;
}

export const createProductService = (object) => {
    const createdProduct = productsDao.createOne(object);
    return createdProduct;
}

export const updateProductService = (id, object) => {
    const updatedProduct = productsDao.updateOne(id, object);
    return updatedProduct;
}

export const deleteProductService = (id) => {
    const deletedProduct = productsDao.deleteOne(id);
    return deletedProduct;
}