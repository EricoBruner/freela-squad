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
