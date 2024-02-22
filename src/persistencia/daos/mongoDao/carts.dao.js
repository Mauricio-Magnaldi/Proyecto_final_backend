import { cartsModel } from "../../../models/carts.model.js";
import BasicDao from "./basic.dao.js";

class CartsDao extends BasicDao {
    constructor(){
        super(cartsModel, "products.product")
    }
    
    async getCartById(cid) {
        const cart = await this.findById(cid);
        return cart;
    }

    async findByFilter(filter) {
        const cart = await this.findById(filter);
        return cart;        
    }

}

export const cartsDao = new CartsDao();
