import { db } from "../database/database.connection.js";

export async function createService(service, id) {
  const resp = await db.query(
    `INSERT INTO services (title, image, available, description, "paymentType", price, "freelancerId") VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [
      service.title,
      service.image,
      service.available,
      service.description,
      service.paymentType,
      service.price,
      id,
    ]
  );

  return resp;
}

export async function getAllServices() {
  const resp = await db.query(
    `SELECT 
      services.*, 
      freelancers.name, 
      freelancers.phone, 
      freelancers.email, 
      city.name AS "cityName", 
      state.acronym AS "stateAcronym" 
    FROM services 
    JOIN freelancers 
      ON freelancers.id = services."freelancerId"
    JOIN city 
      ON city.id = freelancers."cityId"
    JOIN state 
      ON state.id = city."stateId"
    WHERE services.available = true
    ORDER BY services.id DESC LIMIT 10;`
  );

  return resp;
}

export async function getServiceById(id) {
  const resp = await db.query(
    `SELECT 
      services.*, 
      freelancers.name, 
      freelancers.phone, 
      freelancers.email, 
      city.name AS "cityName", 
      state.acronym AS "stateAcronym" 
    FROM services 
    JOIN freelancers 
      ON freelancers.id = services."freelancerId"
    JOIN city 
      ON city.id = freelancers."cityId"
    JOIN state 
      ON state.id = city."stateId"
    WHERE services.available = true AND services.id = $1;`,
    [id]
  );

  return resp;
}
