import { Router } from "express";
import { serviceController } from "../controllers/index.controller.js";
import tokenValidator from "../middlewares/token.validator.js";

const serviceRouter = Router();

serviceRouter.post(
  "/services/create",
  tokenValidator,
  serviceController.createServiceRoute
);

serviceRouter.get(
  "/services",
  tokenValidator,
  serviceController.getAllServicesRoute
);

serviceRouter.get(
  "/services/:id",
  tokenValidator,
  serviceController.getOneService
);

export default serviceRouter;
