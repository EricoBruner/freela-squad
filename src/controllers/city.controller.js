import { getAllCities } from "../repositories/city.repositories.js";

export async function getAllCity(req, res) {
  try {
    const { rows: arrayCity } = await getAllCities();

    return res.status(200).send(arrayCity);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}
