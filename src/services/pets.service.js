import { PetModel } from "../models/user.model.js";
import { generatePet } from "../utils/user.utils.js";

export const createPetsMock = async (cant = 50) => {
  try {
    const pets = [];
    for (let i = 0; i <= cant; i++) {
      pets.push(generatePet());
    }
    return await PetModel.create(pets);
  } catch (error) {
    throw new Error(error);
  }
};

export const getPets = async () => {
  try {
    return await PetModel.find();
  } catch (error) {
    throw new Error(error);
  }
};