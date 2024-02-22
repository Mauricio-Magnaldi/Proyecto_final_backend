export default class UserDTO {
    constructor(object) {
        this.full_name = `${object.first_name} ${object.last_name}`;
        this.email = object.email;
    }
}


/*
Donde necesito utilizar el dto lo importo con import UserDTO from "./dto/user.dto.js";
En el archivo donde necesito utilizar el dto hago:

const userDto = new UserDTO(...obj);

Se utiliza desde sessions/current para devolver el usuario actual.
Modificar la ruta /current para evitar enviar información sensible, enviar un DTO del usuario solo con la informacion necesaria.
*/

