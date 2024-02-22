import { usersDao } from "../persistencia/daos/mongoDao/users.dao.js";
import { customeResponse } from "../utils/utils.js";
import { errors } from "../errors/error.dictionary.js";
import { hashData, compareData, transporter, generateToken } from "../utils/index.js";

export const login = async (userInfo) => {
    const {email, password} = userInfo;
    const user = await usersDao.findByEmail(email);
    if(!user) {
        return customeResponse(res, 401, errors.EmailOrPasswordWrongError);
    }
    const isPasswordValid = await compareData(password, user.password);
    if(!isPasswordValid) {
        return customeResponse(res, 401, errors.EmailOrPasswordWrongError);
    }
    const token = generateToken({
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        role: user.role,
    });
    return {token};
};

export const singup = async (userInfo) => {
    const {email, password} = userInfo;
    const user = await this.usersDao.findByEmail(email);
    if(user) {
        return customeResponse(res, 401, errors.InvalidEmailError);       
    }
    const hashedPassword = await hashData(password);
    const newUser = await usersDao.createOne({
        ...userInfo, 
        password: hashedPassword});  
        const token = generateToken({
            id: newUser.id,
            email: newUser.email,
            first_name: newUser.first_name,
            role: newUser.role,
        });
        return {token, user: newUser};
    }