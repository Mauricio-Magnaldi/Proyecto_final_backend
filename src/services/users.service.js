import { cartsDao } from "../persistencia/daos/mongoDao/carts.dao.js";
import { usersDao } from "../persistencia/daos/mongoDao/users.dao.js";
import { hashData, compareData, transporter } from "../utils/index.js";
//import UserDto from "../persistencia/dtos/user.dto.js";

export const findService = () => {
    const users = usersDao.findAll();
    return users;
}

export const findByIdUserService = (id) => {
    const user = usersDao.findById(id);
    return user;
}

export const findByEmailUserService = (email) => {
    const user = usersDao.findByEmail(email);    
    return user;
}

export const createUserService = async (object) => {    
    const hashPassword = await hashData(object.password);
    const createdCart = cartsDao.createOne({products: []});
    const createdUser = usersDao.createOne({...object, password: hashPassword, cart: createdCart._id});
    return createdUser;
}

export const updateUserService = (id, object) => {
    const updatedUser = usersDao.updateOne(id, object);
    return updatedUser;
}

export const deleteUserService = (id) => {
    const deletedUser = usersDao.deleteOne(id);
    return deletedUser;
}

// export const changeRoleService = (id, user) => {
//     const foundUser = usersDao.findOne(id);

// }
