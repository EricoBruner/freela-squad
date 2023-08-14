import {
  createService,
  deleteServiceById,
  getAllServices,
  getServiceById,
  getServicesByUser,
} from "../repositories/service.repositories.js";

export async function createServiceRoute(req, res) {
  const userId = res.locals.userId;
  const { title, image, available, description, paymentType, price } = req.body;

  try {
    await createService(
      { title, image, available, description, paymentType, price },
      userId
    );

    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

export async function getAllServicesRoute(req, res) {
  try {
    const { rows: services } = await getAllServices();

    const servicesFormatted = services.map((service) => {
      const freelancer = {
        id: service.freelancerId,
        name: service.name,
        phone: service.phone,
        email: service.email,
        cityName: service.cityName,
        stateAcronym: service.stateAcronym,
      };

      delete service.freelancerId;
      delete service.freelancerName;
      delete service.phone;
      delete service.email;
      delete service.cityName;
      delete service.stateAcronym;
      delete service.name;

      return {
        ...service,
        freelancer,
      };
    });

    return res.status(200).send(servicesFormatted);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

export async function getOneService(req, res) {
  const { id } = req.params;

  try {
    if (!id || isNaN(id)) {
      return res
        .status(404)
        .send({ message: "Id não encontrado ou inválido!" });
    }

    const {
      rows: [service],
    } = await getServiceById(id);

    if (!service) {
      return res
        .status(404)
        .send({ message: "Id não encontrado ou inválido!" });
    }

    const freelancer = {
      id: service.freelancerId,
      name: service.name,
      phone: service.phone,
      email: service.email,
      cityName: service.cityName,
      stateAcronym: service.stateAcronym,
    };

    delete service.freelancerId;
    delete service.freelancerName;
    delete service.phone;
    delete service.email;
    delete service.cityName;
    delete service.stateAcronym;
    delete service.name;

    const serviceFormatted = { ...service, freelancer };

    return res.status(200).send(serviceFormatted);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

export async function getMyServices(req, res) {
  const { userId } = res.locals;

  try {
    const { rows: services } = await getServicesByUser(userId);

    const servicesFormatted = services.map((service) => {
      const freelancer = {
        id: service.freelancerId,
        name: service.name,
        phone: service.phone,
        email: service.email,
        cityName: service.cityName,
        stateAcronym: service.stateAcronym,
      };

      delete service.freelancerId;
      delete service.freelancerName;
      delete service.phone;
      delete service.email;
      delete service.cityName;
      delete service.stateAcronym;
      delete service.name;

      return {
        ...service,
        freelancer,
      };
    });

    return res.status(200).send(servicesFormatted);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

export async function deleteService(req, res) {
  const { id } = req.params;
  const { userId } = res.locals;

  try {
    const {
      rows: [service],
    } = await getServiceById(id);

    if (!service) {
      res.status(404).send({ message: "Serviço não encontrado" });
    }

    if (service.freelancerId != userId) {
      res
        .status(403)
        .send({ message: "Este serviço não pertence a esse usuário" });
    }

    await deleteServiceById(id);

    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}
