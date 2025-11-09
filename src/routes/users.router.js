import express from 'express';
import User from '../models/User.js';

const router = express.Router();

/**
 * GET /
 * Obtener todos los usuarios
 */
router.get('/', async (req, res) => {
    try {
        const users = await User.find().populate('pets');
        
        res.json({
            status: 'success',
            message: 'Usuarios obtenidos exitosamente',
            data: users
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener usuarios',
            error: error.message
        });
    }
});

/**
 * GET /:id
 * Obtener un usuario por ID
 */
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('pets');
        
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'Usuario no encontrado'
            });
        }
        
        res.json({
            status: 'success',
            message: 'Usuario obtenido exitosamente',
            data: user
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener usuario',
            error: error.message
        });
    }
});

/**
 * POST /
 * Crear un nuevo usuario
 */
router.post('/', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        
        res.status(201).json({
            status: 'success',
            message: 'Usuario creado exitosamente',
            data: user
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'Error al crear usuario',
            error: error.message
        });
    }
});

/**
 * PUT /:id
 * Actualizar un usuario
 */
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('pets');
        
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'Usuario no encontrado'
            });
        }
        
        res.json({
            status: 'success',
            message: 'Usuario actualizado exitosamente',
            data: user
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'Error al actualizar usuario',
            error: error.message
        });
    }
});

/**
 * DELETE /:id
 * Eliminar un usuario
 */
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'Usuario no encontrado'
            });
        }
        
        res.json({
            status: 'success',
            message: 'Usuario eliminado exitosamente',
            data: user
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al eliminar usuario',
            error: error.message
        });
    }
});

export default router;