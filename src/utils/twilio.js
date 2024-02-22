import twilio from 'twilio';
import configEnv from "../config/configDotenv.js";

export const client = twilio(
    configEnv.twilio_account_sid,
    configEnv.twilio_auth_token,
);
