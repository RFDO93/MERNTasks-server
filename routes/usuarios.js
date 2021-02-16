//Rutas para gestionar Modulo de usuarios
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/Auth');
const UsuarioController = require('../controllers/UsuarioController');
const { check } = require('express-validator');

//api/usuario
//Crear Usuario
router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Agregar un email válido').isEmail(),
        check('password', 'El password debe ser mínimo de 6 caracteres').isLength({ min: 6 })
    ],
    UsuarioController.crearUsuario
);

//Extraer usuario
router.get('/',
    authMiddleware,
    UsuarioController.getUser
);

module.exports = router;