// export const authMiddleware = (role) => {
//     return (req, res, next) => {
//         if(req.user.role !== role) {
//             return res.status(403).json({mensaje: "Usuario no autorizado."});
//         }
//         next();
//     }
// }

export const loginRequired = (req, res, next) => {
    if(req.session && req.user && req.user.email) {
        next();
    }
    return res.redirect("/login");
}

export const authMiddleware = (role) => {
    return (req, res, next) => {
        if(req.user.role === role) {
            next();
        }
        return res.status(401).json({message:`El rol ${role} es requerido.`});
    }
}

export const roleRequired = (role) => {
    return (req, res, next) => {
        if(req.user.role === role) {
            next();
        } else {
            return res.status(401).json({message: `The role ${role} es requerido.`});
        }
    }
}