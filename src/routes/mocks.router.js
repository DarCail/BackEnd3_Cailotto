import express from 'express';
import { generatePets } from '../utils/petMocking.js';
import { generateUsers } from '../utils/userMocking.js';
import User from '../models/User.js';
import Pet from '../models/Pet.js';

const router = express.Router();

/**
 * GET /mockingpets
 * Endpoint migrado del primer desafío para generar mascotas
 * Query params: count (opcional, por defecto 50)
 */
router.get('/mockingpets', (req, res) => {
    try {
        const count = parseInt(req.query.count) || 50;
        const pets = generatePets(count);
        
        res.json({
            status: 'success',
            message: `${count} mascotas generadas exitosamente`,
            data: pets
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al generar mascotas',
            error: error.message
        });
    }
});

/**
 * GET /mockingusers
 * Endpoint para generar usuarios con las características especificadas
 * Query params: count (opcional, por defecto 50)
 */
router.get('/mockingusers', async (req, res) => {
    try {
        const count = parseInt(req.query.count) || 50;
        const users = await generateUsers(count);
        
        res.json({
            status: 'success',
            message: `${count} usuarios generados exitosamente`,
            data: users
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al generar usuarios',
            error: error.message
        });
    }
});

/**
 * POST /generateData
 * Endpoint para generar e insertar registros en la base de datos
 * Body params: users (número), pets (número)
 */
router.post('/generateData', async (req, res) => {
    try {
        const { users: userCount, pets: petCount } = req.body;
        
        // Validar parámetros
        if (!userCount && !petCount) {
            return res.status(400).json({
                status: 'error',
                message: 'Debe proporcionar al menos un parámetro: users o pets'
            });
        }
        
        const results = {
            usersInserted: 0,
            petsInserted: 0,
            users: [],
            pets: []
        };
        
        // Generar e insertar usuarios si se especifica
        if (userCount && userCount > 0) {
            const usersToInsert = await generateUsers(parseInt(userCount));
            const insertedUsers = await User.insertMany(usersToInsert);
            results.usersInserted = insertedUsers.length;
            results.users = insertedUsers;
        }
        
        // Generar e insertar mascotas si se especifica
        if (petCount && petCount > 0) {
            const petsToInsert = generatePets(parseInt(petCount));
            const insertedPets = await Pet.insertMany(petsToInsert);
            results.petsInserted = insertedPets.length;
            results.pets = insertedPets;
        }
        
        res.json({
            status: 'success',
            message: `Datos generados e insertados exitosamente: ${results.usersInserted} usuarios, ${results.petsInserted} mascotas`,
            data: results
        });
        
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al generar e insertar datos',
            error: error.message
        });
    }
});

export default router;