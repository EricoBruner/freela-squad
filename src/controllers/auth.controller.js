import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { db } from "../database/database.connection.js";

export async function signUp(req, res) {
  let { name, email, password } = req.body;

  try {
    const encryptedPassword = bcrypt.hashSync(password, 10);
    password = encryptedPassword;

    await db.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
      [name, email, password]
    );

    return res.sendStatus(201);
  } catch (err) {
    const duplicateEmailMessage = `duplicate key value violates unique constraint "users_email_key"`;

    if (err.message == duplicateEmailMessage) {
      res.status(409).send({ message: "Já possui uma conta com esse email!" });
      return;
    }

    return res.status(500).send({ message: err.message });
  }
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
