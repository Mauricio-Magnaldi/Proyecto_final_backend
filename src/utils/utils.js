import { dirname, join } from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import configEnv from "../config/configDotenv.js";
import nodemailer from "nodemailer";

const JWT_SECRET = configEnv.jwt_secret;

export const __dirname = join(dirname(fileURLToPath(import.meta.url)),"../");

export const hashData = async (data) => {
    const hash = await bcrypt.hash(data, 10);
    return hash;
}

export const compareData = async (data, hashData) => {
    return bcrypt.compare(data, hashData);
}

export const generateCode = () => {
    const character = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 4; i++) {
        const index = Math.floor(Math.random() * character.length);
        code = code + character.charAt(index);
    }
    return code;
}

export const generateToken = (user) => {
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: 1500});
    return token;
}

export const customeResponse = (res, status, message) => {
    return res.status(status).json({message: message});
}

export const sendEmail = (options) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: configEnv.gmail_user,
            pass: configEnv.gmail_password,    
        }
    });
} 