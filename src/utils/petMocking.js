import { faker } from '@faker-js/faker';

/**
 * Genera una mascota falsa
 * @returns {Object} Mascota generada
 */
export const generatePet = () => {
    const species = ['perro', 'gato', 'conejo', 'hamster', 'pájaro', 'pez'];
    const randomSpecie = species[Math.floor(Math.random() * species.length)];
    
    return {
        name: faker.person.firstName(),
        specie: randomSpecie,
        birthDate: faker.date.past({ years: 5 }), // Nacimiento en los últimos 5 años
        adopted: faker.datatype.boolean(),
        image: faker.image.urlLoremFlickr({ category: 'animals' }),
        owner: null // Sin dueño inicialmente
    };
};

/**
 * Genera múltiples mascotas
 * @param {number} count - Cantidad de mascotas a generar
 * @returns {Array} Array de mascotas generadas
 */
export const generatePets = (count = 50) => {
    const pets = [];
    
    for (let i = 0; i < count; i++) {
        pets.push(generatePet());
    }
    
    return pets;
};