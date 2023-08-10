import { signInSchema, signUpSchema } from "../schemas/auth.schema.js";
import { schemaValidator } from "../validators/schema.validator.js";

export function authValidator(req, res, next) {
  const user = { ...req.body };
  const path = req.url;

  if (path == "/signup/freelancer" || path == "/signup/customer") {
    const error = schemaValidator(signUpSchema, user);
    if (error) return res.status(422).send({ message: error });

    return next();
  }

  if (path == "/") {
    const error = schemaValidator(signInSchema, user);
    if (error) return res.status(422).send({ message: error });

    next();
  }

  next();
}
