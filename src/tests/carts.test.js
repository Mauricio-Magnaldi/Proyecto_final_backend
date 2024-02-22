import supertest from "supertest";
import { expect } from "chai";
import configEnv from "../utils/configDotenv.js";

const requester = supertest(configEnv.url_frontend);

let token;
let currentIdCart;

describe("Pruebas de la ruta cart", () => {
    before(async () => {
        const user = {
            email: "adminCoder@coder.com",
            password: "adminCod3r123$",
        };

        const response = (await requester.post("/api/sessions/login")).send(user);
        token = response._body.message.token;
    });
    
    it("should get the cart of the user", async () => {
        const response = await requester
            .get("/api/carts")
            .set("Authorization", "Bearer" + token);

        expect(response.statusCode).to.be.equal(200);
        expect(response._body).to.have.property("message");
        expect(response._body.message).to.have.property("id");
        currentIdCart = response._body.message.id;
        expect(response._body.message).to.have.property("idUser");
        expect(response._body.message.idUser).to.be.equal(18);
        expect(response._body.message).to.have.property("products");
    });

    it("should get history of carts", async () => {
        const response = await requester
            .get("/api/carts/history")
            .set("Authorization", "Bearer" + token);
        
        expect(response.statusCode).to.equal(200);
        expect(response._body).to.have.property("message");
        expect(response._body.message[0]).to.have.property("bought");
        expect(response._body.message[1].bought).to.be.true;      
    });

    it("should add product to cart", async () => {
        const response = await requester
            .post("/api/carts")
            .set("Authorization", "Bearer" + token)
            .send({
                idCart: currentIdCart,
                idProduct: 1,
            });
        expect(response.statusCode).to.be.equal(201);
        expect(response._body).to.have.property("message");
        expect(response._body.message).to.be.equal("Product added to cart");
    });

    it("should delete a product from cart", async () => {
        const response = await requester
            .delete("/api/carts/" + currentIdCart + "/product/1")
            .set("Authorization", "Bearer" + token);
        expect(response.statusCode).to.be.equal(200);
        expect(response._body).to.have.property("message");
        expect(response._body.message).to.be.equal("Product remove from cart");
    });
});