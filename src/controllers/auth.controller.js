import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import {
  createCustomer,
  createFreelancer,
  getUserByEmail,
  saveSessionToDatabase,
} from "../repositories/auth.repositories.js";

export async function signUp(req, res) {
  const { type } = req.params;
  let { name, email, password, image, phone, cityId } = req.body;

  const encryptedPassword = bcrypt.hashSync(password, 10);
  password = encryptedPassword;

  if (type == "customer") {
    try {
      const {
        rows: [emailExist],
      } = await getUserByEmail(email);

      if (emailExist) {
        return res
          .status(409)
          .send({ message: "Já possui uma conta com esse email!" });
      }

      await createCustomer({ name, email, password, image, phone, cityId });

      return res.sendStatus(201);
    } catch (error) {
      if (error.message.includes("duplicate key value")) {
        return res
          .status(409)
          .send({ message: "Já possui uma conta com esse email!" });
      }

      return res.status(500).send({ message: error.message });
    }
  }

  if (type == "freelancer") {
    try {
      const {
        rows: [emailExist],
      } = await getUserByEmail(email);

      if (emailExist) {
        return res
          .status(409)
          .send({ message: "Já possui uma conta com esse email!" });
      }

      await createFreelancer({ name, email, password, image, phone, cityId });

      return res.sendStatus(201);
    } catch (error) {
      if (error.message.includes("duplicate key value")) {
        return res
          .status(409)
          .send({ message: "Já possui uma conta com esse email!" });
      }

      return res.status(500).send({ message: error.message });
    }
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;
  const token = uuid();

  try {
    const {
      rows: [user],
    } = await getUserByEmail(email);

    if (!user)
      return res.status(401).send({ message: "Usuário não encontrado!" });

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).send({ message: "Usuário ou senha incorretas!" });
    }

    await saveSessionToDatabase(user.userType, user.id, token);

    return res.status(200).send({ token: token, userType: user.userType });
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
