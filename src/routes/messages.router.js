import { Router } from "express";
//import { transporter } from "../utils/nodemailer.js";
import { __dirname } from "../utils/utils.js";
import { client } from "../utils/twilio.js";
import configEnv from "../config/configDotenv.js";

const router = Router();

router.get("/", async (req, res) => {
    const options = {
        from: "serviciosdiversos2013@gmail.com",
        to: ["serviciosdiversos2013@gmail.com",
        "mauricio.magnaldi@telefonica.com"],
        subject: "Informacion sobre tu compra",
        text: "La compra fue completada.",
        html:'<h1>Primera confirmacion de compra.</h1>',
        attachments: [{path: __dirname + "/public/images/compra_exitosa.jpg"}],
    } ;
    await transporter.sendMail(options);
    res.send("Enviando email.");
})

router.post("/", async (req, res) => {
    const { first_name, email, message } = req.body;
    const options = {
        from: "serviciosdiversos2013@gmail.com",
        to: email,
        subject: message,
        text: `Registro exitoso. Bienvenido ${first_name}`,
    } ;
    await transporter.sendMail(options);
    res.send("Signup");
})

router.get("/twilio", async (req, res) => {
    const  options = {
        body: "Prueba twilio via sms",
        to: "+542614601107",
        from: configEnv.twilio_phone_number,

    }
    await client.messages.create(options);
    res.send("TWILIO");
})

export default router;