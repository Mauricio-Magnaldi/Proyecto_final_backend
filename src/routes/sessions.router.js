import { Router } from "express";
import { hashData, compareData, generateToken } from "../utils/utils.js";
import { usersDao } from "../persistencia/daos/mongoDao/users.dao.js";
import passport from "passport";

const router = Router();

router.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/auth/google/callback", 
  passport.authenticate("google", { failureRedirect: "/signup" }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("/home");
  });

router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        return res.redirect("/");
    })
})



//Se comenta para utilizar JWT con login tradicional.
// //Passport - singup
// router.post(
//     "/signup", 
//     passport.authenticate("signup", {
//         successRedirect: "/home",
//         failureRedirect: "/error",
//     }));

// //Passport - login
// router.post(
//     "/login", 
//     passport.authenticate("login", {
//     successRedirect: "/home", 
//     failureRedirect: "/error",
//     }));

//Github
router.get("/auth/github", passport.authenticate("github", {
    scope: ["user:email"]
}));

router.get("/github", passport.authenticate("github", {failureRedirect: "/error",}), (req, res) => {
    req.session.user = req.user;
    return res.redirect("/home");
});

router.post("/login", async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Todos los datos son obligatorios." });
        }
    try {
        const userDB = await usersDao.findByEmail(email);
        if(!userDB) {
            return res.status(400).json({ message: "Credenciales invalidas." });
        }
        const comparePassword = await compareData(password, userDB.password);
        if (!comparePassword) {
            return res.status(400).json({ message: "Credenciales invalidas." });
        } 
        // req.session["email"] = email;
        // req.session["first_name"] = userDB.first_name;
        // req.session["role"] = 
        //     email === "adminCoder@coder.com" && password === "adminCod3r123" ? "admin" : role;
        const token = generateToken({first_name: userDB.first_name, email, role: userDB.role});
        return res
        .status(200)
        .cookie("token",token, {httpOnly: true})
        .json({ message: `Bienvenido ${userDB.first_name}`,token });
        //res.redirect("/home");
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
})

//Se comenta, no corresponde a passport.
//Se registra por primera y única vez en la aplicación.
router.post("/signup", async (req, res) => {
    const { first_name, last_name, email, age, password, role } = req.body;
        if (!first_name || !last_name || !email || !password || !role) {
            return res.status(400).json({ message: "Todos los datos son obligatorios." });
        }
    try {
        const userDB = await usersManager.findByEmail(email);
        if ( userDB ) {
            return res.status(401).json({ message: "Un usuario con el mismo email ya existe." });
        }
        const hashedPassword = await hashData(password);
        const createdUser = await usersManager.createOne({...req.body, password : hashedPassword});
        return res.status(200).json({ message:"Usuario creado.", user: createdUser });
        //res.redirect("/home");
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
})

export default router;