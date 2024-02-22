import nodemailer from "nodemailer";
import configEnv from "../config/configDotenv.js"

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: configEnv.gmail_user,
        pass: configEnv.gmail_password,    
    }
});
