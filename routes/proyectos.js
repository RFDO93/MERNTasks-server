const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/Auth');
const ProyectoController = require('../controllers/ProyectoController');
const { check } = require('express-validator');
//Gestión de proyectos 
//api/proyecto

router.post('/',
    authMiddleware,
    [
        check('nombre','El nombre es obligatorio.').not().isEmpty()
    ],
    ProyectoController.crearProyecto
);

router.get('/',
    authMiddleware,
    ProyectoController.listarProyecto
);

router.delete('/',
    authMiddleware,
    ProyectoController.eliminarProyecto
);

router.put('/',
    authMiddleware,
    [
        check('nombre','El nombre es obligatorio.').not().isEmpty()
    ],
    ProyectoController.editarProyecto
);

module.exports = router;