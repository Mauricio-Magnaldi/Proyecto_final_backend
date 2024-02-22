import {
    findService,
    findByEmailUserService,
    findByIdUserService,
    //deleteInactiveUsersService,
    createUserService,
    updateUserService,
    deleteUserService,
    //uploadDocumentService,
    //changeRoleService 
} from "../services/users.service.js";
import { customeResponse } from "../utils/utils.js";
import { errors } from "../errors/error.dictionary.js";

// export const deleteInactiveUsersController = async (req, res, next) => {
//     try {
//         const result = await deleteInactiveUsersService();
//         if (!result) {
//             return customeResponse(res, 404, "Usuarios inactivos no eliminados.");   
//         }
//         return customeResponse(res, 200, "Usuarios inactivos no eliminados.");
//     } catch (error) {
//         return next(error);
//     }
// }

//OK
export const findUsersController = async (req, res, next) => {
    try {
        const result = await findService(req.query);
        if (!result) {
            return customeResponse(res, 404, errors.UsersNotFoundError);   
        }
        return customeResponse(res, 200, result);
    } catch (error) {
        return next(error);
    }
}

//OK
export const findByIdUserController = async (req, res, next) => {
    try {
        const {idUser} = req.params;
        const result = await findByIdUserService(idUser);
        if (!result) {
            return customeResponse(res, 404, errors.UserNotFoundError);   
        }
        return customeResponse(res, 200, result);
    } catch (error) {
        next(error);
    }
}

//OK
export const findByEmailUserController = async (req, res, next) => {
    try {
        const {email} = req.params;
        const result = await findByEmailUserService(email);
        if (!result) {
            return customeResponse(res, 404, errors.UserNotFoundError);   
        }
        return customeResponse(res, 200, result);
    } catch (error) {
        return next(error);
    } 
}

export const createUserController = async (req, res, next) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        if (!first_name || !last_name || !email || !password) {
            return customeResponse(res, 400, errors.AllDataAreRequired);
        }
        const existEmail = await findByEmailUserService(email);
        if (existEmail) {
            return customeResponse(res, 409, errors.EmailAlreadyExists);   
        }
        const result = await createUserService(req.body);
        if (!result) {
            return customeResponse(res, 404, result);   
        }
        return customeResponse(res, 200, result);   
    } catch (error) {
        return next(error);
    }
}

//OK
export const updateUserController = async (req, res, next) => {
    try {
        const idUser = req.params.id;
        const result = await updateUserService(idUser, req.body);
        if (!result) {
            return customeResponse(res, 404, errors.UserNotUpdatedError);
        }
        return customeResponse(res, 200, "Usuario actualizado.");
    } catch (error) {
        return next(error);
    }
}


export const deleteUserController = async (req, res, next) => {
    try {
        const {idUser} = req.params;
        const result = await deleteUserService(idUser);
        if (!result) {
            return customeResponse(res, 404, "Usuario no eliminado.");   
        }
        return customeResponse(res, 200, "Usuario eliminado.");
    } catch (error) {
        return next(error);
    }
}

export const deleteCurrentUserController = async (req, res, next) => {
    try {
        const idUser = req.user.id;
        req.logout(async function(error) {
            if (error) {
                return next(error);
            }
        })
        const result = await deleteUserService(idUser);
        if (!result) {
            return customeResponse(res, 404, "Usuario no eliminado.");   
        }
        return customeResponse(res, 200, "Usuario eliminado.");
    } catch (error) {
        return next(error);
    }
}

export const changeRoleController = async (req, res, next) => {
    try {
        const idUser = req.params.idUser;
        const actualUser = req.user;
        const result = await changeRoleService(idUser, actualUser);
        if (!result) {
            return customeResponse(res, 404, "Role no actualizado.");   
        }
        return customeResponse(res, 200, "Role actualizado.");
    } catch (error) {
        return next(error);
    }
};

export const uploadDocumentController = async (req, res, next) => {
    try {
        const idUser = req.user.id;
        if(req.file) {
            req.body = { 
                ...req.body, 
                ...{
                    url: req.file.url, 
                    public_id: req.file.publicId, 
                },
            }; 
        } else { 
            throw new errors.NO_DOCUMENT_UPLOADED();
        }
        const result = await uploadDocumentService(idUser, req.body);
        return customeResponse(res, 200, result);            
    } catch (error) {
        return next(error);
    }
};

export const updateCurrentUserController = async (req, res, next) => {
    try {
        const idUser = req.user.id;
        if (req.file) {
            req.body = {
                ...req.body, 
                ...{
                    url_profile_photo: req.file.url, 
                    profile_public_id: req.publicId,
                },
            };
        }
        const result = await updateUserService(idUser, req.body);
        if (!result) {
            return customeResponse(res, 404, result);   
        }
        return customeResponse(res, 200, result);      
    } catch (error) {
        return next(error);
    }
};