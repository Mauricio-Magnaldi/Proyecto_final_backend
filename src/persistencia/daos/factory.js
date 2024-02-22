//Desde la linea de comandos
//npm run start:mongo
//o
//npm run start:file

import CartsFile from "./fileDao/cartsManager.js";
import CartsMongo from "./mongoDao/cartsManager.js;"
import ProductsFile from "./fileDao/productsManager.js";
import ProductsMongo from "./mongoDao/productsManager.js";

class ManagerFactory {
    constructor(persistencia) {
        this.persistencia = persistencia;
    }
    create(type) {
        const persistencia = this.persistencia.toUpperCase();
        const types = {
            products: {
                FILE: ProductsFile,
                MONGO: ProductsMongo,
            },
            carts: {
                FILE: CartsFile,
                MONGO: CartsMongo,
            },
        };

        const ManagerClass = types[type]?.[persistencia];

        if (!ManagerClass) {
            throw new Error(`No se encontró manager para tipo: ${type} con persistencia: ${persistencia}`);
        }

        return new ManagerClass();
    }
}

export default ManagerFactory;

 
