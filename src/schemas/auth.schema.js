import joi from "joi";

export const signUpSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  image: joi.string().uri().required(),
  phone: joi.string().length(11).required(),
  cityId: joi.number().required(),
});

export const signInSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  confirmPassword: joi.string().required(),
});
