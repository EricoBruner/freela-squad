import { db } from "../database/database.connection.js";

export async function createCustomer(data) {
  const resp = await db.query(
    `INSERT INTO customers (name, email, password, image, phone, "cityId") VALUES ($1, $2, $3, $4, $5, $6)`,
    [data.name, data.email, data.password, data.image, data.phone, data.cityId]
  );

  return resp;
}

export async function createFreelancer(data) {
  const resp = await db.query(
    `INSERT INTO freelancers (name, email, password, image, phone, "cityId") VALUES ($1, $2, $3, $4, $5, $6)`,
    [data.name, data.email, data.password, data.image, data.phone, data.cityId]
  );

  return resp;
}

export async function getUserByEmail(email) {
  const resp = await db.query(
    `
    SELECT 
      'customer' AS "userType", 
      "id",
      "email",
      "password" 
    FROM "customers" 
    WHERE "email" = $1
      UNION
    SELECT 
      'freelancer' AS "userType", 
      "id",
      "email",
      "password" 
    FROM "freelancers" 
    WHERE "email" = $1;`,
    [email]
  );

  return resp;
}

export async function saveSessionToDatabase(userType, id, token) {
  let resp;

  if (userType == "customer") {
    await db.query(`DELETE FROM SESSIONS WHERE "customerId"=$1`, [id]);
    resp = await db.query(
      `INSERT INTO sessions (token, "customerId") VALUES ($1, $2)`,
      [token, id]
    );
  }

  if (userType == "freelancer") {
    await db.query(`DELETE FROM SESSIONS WHERE "freelancerId"=$1`, [id]);
    resp = await db.query(
      `INSERT INTO sessions (token, "freelancerId") VALUES ($1, $2)`,
      [token, id]
    );
  }

  return resp;
}
