import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

/**
 * Genera un usuario falso con las características especificadas
 * @returns {Object} Usuario generado
 */
export const generateUser = async () => {
    // Encriptar la contraseña "coder123"
    const hashedPassword = await bcrypt.hash('coder123', 10);
    
    // Determinar rol aleatoriamente
    const roles = ['user', 'admin'];
    const randomRole = roles[Math.floor(Math.random() * roles.length)];
    
    return {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: hashedPassword,
        role: randomRole,
        pets: [] // Array vacío como se especifica
    };
};

/**
 * Genera múltiples usuarios
 * @param {number} count - Cantidad de usuarios a generar
 * @returns {Array} Array de usuarios generados
 */
export const generateUsers = async (count = 50) => {
    const users = [];
    
    for (let i = 0; i < count; i++) {
        const user = await generateUser();
        users.push(user);
    }
    
    return users;
};