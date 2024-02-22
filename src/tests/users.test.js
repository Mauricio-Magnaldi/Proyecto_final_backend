import { usersManager } from "../src/dao/mongoDB/managers/usersManager.js"
import { expect } from "chai"
import "./db.js"

describe("Obtener usuarios", function () { //declaro el contexto

    //prueba unitaria
    it("la bd debe retornar un array", async function () {
        const result = await usersManager.findAll()
        expect(result).to.be.an("array")
    })

    it("la bd no debe tener usuario con lengthOf", async function () {
        const result = await usersManager.findAll()
        expect(result).to.have.lengthOf(0)
        console.log("Result.lengthOf",result.length)
    })

    it("la bd no debe tener usuario", async function () {
        const result = await usersManager.findAll()
        expect(result.length).to.be.not.equal(1)
        console.log("Result.length",result.length)
    })
    
})


describe("Crear usuarios", function () { //declaro el contexto

    after(async function () {
        const users = await usersManager.findAll()
        await usersManager.deleteOne(users[0]._id)
    })

    it("se agrega un usuario a la bd", async function () {
        const user = {
            first_name: "Dionisio",
            last_name: "Fuentes",
            email: "dfuentes@mail.com",
            password: "12345"
         }
        const response = await usersManager.createOne(user) 
        expect(response).to.have.property("_id")
        console.log("Response",response)
    })

    it("da error si falta el email", async function () {
        const user = {
            first_name: "Enrique",
            last_name: "Molina",
            password: "12345"
        }
        try {
            await usersManager.createOne(user)
        } catch (error) {
            expect (error).to.be.an("Error")
        }
    })
})
