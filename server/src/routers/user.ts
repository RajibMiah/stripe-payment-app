import express  from "express";
const router = express.Router();
import {authMiddleware} from "../middlewares/authMiddleware";
import {userLoginController, userProfileController, userRegisterController} from "../controllers/userController";;

router.get('/profile', authMiddleware , userProfileController)


router.post("/register", userRegisterController);

router.post("/login", userLoginController);

export default router;