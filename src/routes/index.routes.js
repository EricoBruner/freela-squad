import { Router } from "express";
import authRouter from "./auth.routes.js";
import cityRouter from "./city.routes.js";
import serviceRouter from "./service.routes.js";

const router = Router();

router.use(authRouter);
router.use(cityRouter);
router.use(serviceRouter);

export default router;
