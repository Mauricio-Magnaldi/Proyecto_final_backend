import { usersModel } from "../../../models/users.model.js";
import BasicDao from "./basic.dao.js";

class UsersDao extends BasicDao {
    constructor(){
        super(usersModel, "cart")
    }

    async findByEmail(email) {
        const user = await usersModel
            .findOne({email})
            .populate({ path: "cart", populate: { path: "products.product"}});
        return user;
    }

    async findAllUsers(options){
        const {limit=10, page=1, ...queryFilter} = options;
        const response = await usersModel.paginate(queryFilter, {
            limit,
            page,  
            lean: true,
        });
        const info = {
            status: response.totalDocs === 0 ? "error" : "success",
            payload: response.docs,    
            totalPages: response.totalPages,
            prevPage: response.prevPage,
            nextPage: response.nextPage,
            page: response.page,
            hasPrevPage: response.hasPrevPage,
            hasNextPage: response.hasNextPage,
            prevLink: response.hasPrevPage 
                ? `http://localhost:8080/api/products?page=${response.prevPage}`
                : null,
            nextLink: response.hasNextPage 
                ? `http://localhost:8080/api/products?page=${response.nextPage}`
                : null,
        }
        return {info};
    }
}

export const usersDao = new UsersDao();
