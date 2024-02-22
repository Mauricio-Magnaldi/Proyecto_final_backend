import { Router } from "express";
import { usersDao } from "../persistencia/daos/mongoDao/users.dao.js";
import { productsDao } from "../persistencia/daos/mongoDao/products.dao.js";

const router = Router();

//localhost:8080 -> vista login o signup

router.get("/", (req, res) => {
 return res.render("arribo");
  //return res.render("login");
  //return res.render("signup");
})

router.get("/chat", (req, res) => {
  return res.render("chat");
})

router.get("/signup", (req, res) => {
  return res.render("signup");
})

router.get("/createProduct", (req, res) => {
  return res.render("createProduct");
})

router.get("/home", async (req, res) => {
    const products = await productsDao.findAllProductsView({});
    return res.render("home", {first_name: req.user.first_name, products});
  });
  
router.get("/home/:idUser", async (req, res) => {
  const { idUser } = req.params;
  const userInfo = await usersDao.findById(idUser);
  const {first_name, last_name, userType} = userInfo;
  const products = await productsDao.findAll(); 
  return res.render("home",{ first_name, last_name, role, products});
})

router.get("/error", (req, res) => {
  return res.render("error");
})

export default router;
