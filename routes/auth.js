//Rutas para autenticar usuarios
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const { check } = require('express-validator');

//api/auth
router.post('/',
    [
        check('email', 'Agregar un email válido').isEmail(),
        check('password', 'El password debe ser mínimo de 6 caracteres').isLength({ min: 6 })
    ],
    AuthController.autenticarUsuario
);

module.exports = router;