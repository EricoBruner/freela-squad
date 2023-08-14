import { Router } from "express";
import { cityController } from "../controllers/index.controller.js";

const cityRouter = Router();

cityRouter.get("/city", cityController.getAllCity);

export default cityRouter;
