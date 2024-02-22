import swaggerJSDOC from "swagger-jsdoc";
import { __dirname } from "./utils.js";

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Desafio",
            version: "1.0.0",
            description: "API para ecommerce",
        }
    },
    apis: [`${__dirname}/docs/*.yaml`],
}

export const swaggerSetup = swaggerJSDOC(swaggerOptions)