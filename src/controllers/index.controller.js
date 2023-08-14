import { signIn, signUp } from "./auth.controller.js";
import { getAllCity } from "./city.controller.js";
import {
  createServiceRoute,
  getAllServicesRoute,
  getOneService,
} from "./services.controller.js";

export const authController = { signIn, signUp };
export const cityController = { getAllCity };
export const serviceController = {
  createServiceRoute,
  getAllServicesRoute,
  getOneService,
};
