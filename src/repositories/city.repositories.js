import { db } from "../database/database.connection.js";

export async function getAllCities() {
  const resp = await db.query("SELECT * FROM city");

  return resp;
}
