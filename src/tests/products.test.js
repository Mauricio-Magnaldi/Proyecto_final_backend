import supertest from "supertest";
import { expect } from "chai";
import configEnv from "../utils/configDotenv.js";

const requester = supertest(configEnv.url_frontend);

let token;

describe("Pruebas de la ruta product", () => {
    before(async () => {
        const user = {
            email: "adminCoder@coder.com",
            password: "adminCod3r123$",
        };

        const response = (await requester.post("/api/sessions/login")).send(user);
        token = response._body.message.token;
    });
    
    it("should get product by id", async () => {
        const response = await requester
            .get("/api/products/1")
            .set("Authorization", "Bearer" + token);

        expect(response.statusCode).to.be.equal(200);
        expect(response._body).to.have.property("message");
        expect(response._body.message).to.have.property("id");
        expect(response._body.message).to.be.equal(1);
        expect(response._body.message).to.have.property("title");
        expect(response._body.title).to.be.equal("God o war");
    });

    it("should update product by id", async () => {
        const response = await requester
            .put("/api/products/1")
            .set("Authorization", "Bearer" + token)
            .send({title: "GOW 1"});

        expect(response.statusCode).to.be.equal(200);
        expect(response._body).to.have.property("message");
        expect(response._body.message).to.be.equal("Product updated successfully");      
        await requester
            .put("/api/products/1")
            .set("Authorization", "Bearer" + token)
            .send({title: "God of war"});
    });

    it("should get all products", async () => {
        const response = await requester
            .post("/api/products/")
            .set("Authorization", "Bearer" + token);
        expect(response.statusCode).to.be.equal(200);
        expect(response._body).to.have.property("message");
        expect(response._body.message).to.be.property("count");
        expect(response._body.message).to.be.property("rows");
        expect(response._body.message).to.be.property("prevLink");
        expect(response._body.message).to.be.property("nextLink");
        expect(response._body.message.rows.length).to.be.greaterThan(0);
    });
});
