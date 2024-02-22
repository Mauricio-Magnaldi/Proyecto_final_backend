import { cartsDao } from "../persistencia/daos/mongoDao/carts.dao.js";
import { productsDao } from "../persistencia/daos/mongoDao/products.dao.js";
import { ticketsDao } from "../persistencia/daos/mongoDao/tickets.dao.js";
import { generateCode } from "../utils/utils.js";

export const findCartsService = () => {
    const carts = cartsDao.findAll();
    return carts;
}

export const findByIdCartService = (id) => {
    const cart = cartsDao.findById(id);
    return cart;
}

export const findCartFromUserService = (filter) => {
    const response = cartsDao.findByFilter(filter);
    return response; 
}

export const createCartService = (object) => {
    const createdCart = cartsDao.createOne(object);
    return createdCart;
};

export const addProductToCartService = (idCart, idProduct) => {
    const cart = cartsDao.findById(idCart);
    const productIndex = cart.products.findIndex(p => p.product.equals(idProduct));
    if (productIndex === -1) {
        //El producto no existe en el carrito,se agrega.
        cart.products.push({ product: idProduct, quantity: 1 });
    } else {
        //El producto ya existe en el carrito, se suma 1.
        cart.products[productIndex].quantity++;
    }
    cart.save();
    return cart;
};

export const purchaseCartService = (idC) => {
    const {idCart } = req.params;
    const cart = cartsDao.findById(idCart);
    const ticketData = {
        code: generateCode(),
        purchase_datetime: new Date(),
        products: cart.products.map(product => ({
            _id: product.product._id,
            title: product.product.title,
            quantity: product.quantity,
            unitPrice: product.product.price 
        })),
        amount: cart.products.reduce((total, product) => total + product.product.price * product.quantity, 0 ),
        purchaser: req.user.email
    }
    const ticket = ticketsManager.createOne(ticketData);
    
    //REALIZAR CONTROL DE STOCK, RESTA DE STOCK, VACIAR EL CARRITO

    const mailData = 
    `
        <h3>Ticket ${ticket.code}</h3>
        <ul>
            <li><b>Purchaser:</b>${ticket.purchaser}</li>
            <li><b>Time:</b> ${ticket.purchase_datetime}</li>
            <li><b>Products:</b>${ticket.products.map(product => `${product.quantity}x<p>${product.title}</b>:$${product.quantity*product.unitPrice}`).join(" - ")}
            </li>
            <li><b>Total</b>$${ticket.amount}</li>
        </ul>
    `
    transporter.sendMail(ticket.purchaser, `ticket: ${ticket.code}`, mailData);
    return ticket;
}

export const deleteCartService = (id) => {
    const deletedCart = cartsDao.deleteOne(id);
    return deletedCart;
}

///:idCart/products/:idProduct
export const deleteProductFromCartService = (idCart, idProduct) => {
    const cart = cartsDao.findById(idCart);
    const productIndex = cart.products.findIndex(p => p.product.equals(idProduct));
    if (productIndex === -1) {
        cart.products[productIndex];
    }
    cart.save();
    return cart;    
}

