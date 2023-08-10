import { Router } from "express";
import { authValidator } from "../middlewares/auth.validator.js";
import { authController } from "../controllers/index.controller.js";

const authRouter = Router();

authRouter.post("/", authValidator, authController.signIn);
authRouter.post("/signup", authValidator, authController.signUp);

export default authRouter;
