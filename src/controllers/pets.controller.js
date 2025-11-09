import * as PetService from "../services/pets.service.js";

export const createPet = async (req, res, next) => {
  try {
    const { cant } = req.query;
    const response = await PetService.createPetsMock(cant);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const getPets = async (req, res, next) => {
  try {
    const response = await PetService.getPets();
    res.json(response);
  } catch (error) {
    next(error);
  }
};