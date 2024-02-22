import { Router } from "express";
import {
    deleteCurrentUserController,
    createUserController,
    //updateCurrentUserController,
    //forgotPasswordController,
    //resetPasswordController,
    changeRoleController,
    findUsersController,
    //uploadDocumentController,
    //deleteInactiveUsersController,
    updateUserController,
    findByIdUserController,
    findByEmailUserController,
    //deleteByIdUserController,
} from "../controllers/users.controller.js";
//import { multerUploads, processFile } from "../middlewares/uploadFiles.middleware.js";
import { loginRequired, roleRequired } from "../middlewares/auth.middleware.js";
// import { body_must_not_contain_attributes, meetsWithEmailRequirements, meetsWithPasswordRequiremets} from "../middlewares/validationData.middleware.js";

const router = Router();

router.get("/", /*loginRequired, roleRequired,*/ findUsersController);//PROBADO OK
router.get("/:idUser", /*loginRequired, roleRequired,*/ findByIdUserController);//PROBADO OK
router.get("/email/:email", /*loginRequired, roleRequired,*/ findByEmailUserController);//PROBADO OK
router.delete ("/", loginRequired, roleRequired, deleteCurrentUserController);
//router.delete("/inactive", loginRequired, roleRequired, deleteInactiveUsersController);
//router.delete("/:idUser", loginRequired, roleRequired, deleteByIdUserController);
// router.put("/", /*loginRequired, 
//     // body_must_not_contain_attributes([ "id" , "email" , "password" , "oauthuser" , "role" ]),
//     // multerUploads,
//     // processFile,*/
//      updateCurrentUserController);
router.put("/:id", updateUserController);
router.put("/admin/:idUser", loginRequired, changeRoleController);
router.put("/premium/:uid", changeRoleController);
//router.put("/forgotPassword", meetsWithEmailRequirements, forgotPasswordController);
//router.put("/resetPassword/:token", meetsWithPasswordRequiremets, resetPasswordController);
//router.post("/documents", /*loginRequired, multerUploads, processFile,*/ uploadDocumentController);
router.post("/", createUserController);
router.post("/login", createUserController);

export default router;
