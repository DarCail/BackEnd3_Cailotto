import express from 'express';
import Pet from '../models/Pet.js';

const router = express.Router();

/**
 * GET /
 * Obtener todas las mascotas
 */
router.get('/', async (req, res) => {
    try {
        const pets = await Pet.find().populate('owner');
        
        res.json({
            status: 'success',
            message: 'Mascotas obtenidas exitosamente',
            data: pets
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener mascotas',
            error: error.message
        });
    }
});

/**
 * GET /:id
 * Obtener una mascota por ID
 */
router.get('/:id', async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id).populate('owner');
        
        if (!pet) {
            return res.status(404).json({
                status: 'error',
                message: 'Mascota no encontrada'
            });
        }
        
        res.json({
            status: 'success',
            message: 'Mascota obtenida exitosamente',
            data: pet
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener mascota',
            error: error.message
        });
    }
});

/**
 * POST /
 * Crear una nueva mascota
 */
router.post('/', async (req, res) => {
    try {
        const pet = new Pet(req.body);
        await pet.save();
        
        res.status(201).json({
            status: 'success',
            message: 'Mascota creada exitosamente',
            data: pet
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'Error al crear mascota',
            error: error.message
        });
    }
});

/**
 * PUT /:id
 * Actualizar una mascota
 */
router.put('/:id', async (req, res) => {
    try {
        const pet = await Pet.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('owner');
        
        if (!pet) {
            return res.status(404).json({
                status: 'error',
                message: 'Mascota no encontrada'
            });
        }
        
        res.json({
            status: 'success',
            message: 'Mascota actualizada exitosamente',
            data: pet
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'Error al actualizar mascota',
            error: error.message
        });
    }
});

/**
 * DELETE /:id
 * Eliminar una mascota
 */
router.delete('/:id', async (req, res) => {
    try {
        const pet = await Pet.findByIdAndDelete(req.params.id);
        
        if (!pet) {
            return res.status(404).json({
                status: 'error',
                message: 'Mascota no encontrada'
            });
        }
        
        res.json({
            status: 'success',
            message: 'Mascota eliminada exitosamente',
            data: pet
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al eliminar mascota',
            error: error.message
        });
    }
});

export default router;