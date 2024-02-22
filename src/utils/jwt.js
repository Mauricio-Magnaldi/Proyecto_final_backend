import jwt from "jsonwebtoken";
import configEnv from "../config/configDotenv.js";

export const generateToken = (user) => {
    return jwt.sign(user, configEnv.jwt_secret, {expiresIn: "1h"});
}