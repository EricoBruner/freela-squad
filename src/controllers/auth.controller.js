import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { db } from "../database/database.connection.js";
import {
  createCustomer,
  createFreelancer,
} from "../repositories/auth.repositories.js";

export async function signUp(req, res) {
  const type = req.params;
  let { name, email, password, image, phone, cityId } = req.body;

  const encryptedPassword = bcrypt.hashSync(password, 10);
  password = encryptedPassword;

  if (type == "customer") {
    try {
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

  return res
    .status(422)
    .send({ message: "Parâmetro 'type' da rota incorreto!" });
}

export async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const token = uuid();

    const {
      rows: [user],
    } = await db.query("SELECT * FROM users WHERE email=$1", [email]);

    if (!user) return res.status(401).send("Usuário não encontrado!");

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).send("Usuário ou senha incorretas!");
    }

    await db.query("DELETE FROM sessions WHERE user_id=$1", [user.id]);
    await db.query("INSERT INTO sessions (token, user_id) VALUES ($1, $2)", [
      token,
      user.id,
    ]);

    return res.status(200).send({ token: token });
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
