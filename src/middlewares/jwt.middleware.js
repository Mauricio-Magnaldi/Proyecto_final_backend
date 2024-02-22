import jwt from "jsonwebtoken";
import configEnv from "../config/configDotenv.js";

const JWT_SECRET = configEnv.jwt_secret;

export const jwtValidation = (req, res, next) => {
    try {
        //verificar como se recupera la cookie con jwt y se comentan los renglones de los 2 sig. const.
        const authHeader = req.get('Authorization');
        const token = authHeader.split(" ")[1];
        const responseToken = jwt.verify(token, JWT_SECRET);
        req.user = responseToken;
        next();
    } catch (error) {
        res.status(500).json({ error });
    }
}