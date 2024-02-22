import { ordersManager } from "../persistencia/daos/mongoDao/orders.dao.js";

export const findOrdersService = () => {
    const users = ordersManager.findAll();
    return users;
}

export const findByIdOrderService = (id) => {
    const user = ordersManager.findById(id);
    return user;
}

export const createOrderService = (object) => {
    const createdOrder = ordersManager.createOne(object);
    return createdOrder;
}

export const updateOrderService = (id, object) => {
    const updatedOrder = ordersManager.updateOne(id, object);
    return updatedOrder;
}

export const deleteOrderService = (id) => {
    const deletedOrder = ordersManager.deleteOne(id);
    return deletedOrder;
}

