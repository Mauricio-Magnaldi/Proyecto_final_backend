import {
    findOrdersService,
    findByIdOrderService,
    createOrderService,
    updateOrderService,
    deleteOrderService 
} from "../services/orders.service.js";
import { customeResponse } from "../utils/utils.js";

export const findOrdersController = async (req, res, next) => {
    try {
        const result = await findOrdersService();
        if (!result) {
            return customeResponse(res, 404, result);
        }
        return customeResponse(res, 200, result);
    } catch (error) {
        return next(error);
    }
}

export const findByIdOrderController = async (req, res, next) => {
    try {
        const {idOrder} = req.params;
        const result = await findByIdOrderService(idOrder);
        if (!result) {
            return customeResponse(res, 404, result);
        }
        return customeResponse(res, 200, result);
    } catch (error) {
        return next(error);
    }
}

export const createOrderController = async (req, res, next) => {
    try {
        const campos = ["user", "products", "price"];
        for (const campo of campos) {
            if(!req.body[campo]) {
                return customeResponse(res, 400, "Falto un dato.");
            }
        }  
        const result = await createOrderService(req.body);
        if (!result) {
            return customeResponse(res, 404, result);
        }
        return customeResponse(res, 200, result);   
    } catch (error) {
        return next(error);
    }
}

export const updateOrderController = async (req, res, next) => {
    try {
        const {idOrder} = req.params;
        const result = await updateOrderService(idOrder, req.body);
        if (!result) {
            return customeResponse(res, 404, result);
        }
        return customeResponse(res, 200, result);
    } catch (error) {
        return next(error);
    }   
}

export const deleteOrderController = async (req, res, next) => {
    try {
        const {idOrder} = req.params;
        const result = await deleteOrderService(idOrder);
        if (!result) {
            return customeResponse(res, 404, result);    
        }
        return customeResponse(res, 200, result);
    } catch (error) {
        return next(error);
    }
}