const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/Auth');
const TareaController = require('../controllers/TareaController');
const { check } = require('express-validator');

//Gestionar Tareas
// api/tarea

//Crear Tarea
router.post('/',
    authMiddleware,
    [
        check('nombre','El nombre es obligatorio.').not().isEmpty(),
        check('proyecto','El proyecto es obligatorio.').not().isEmpty()
    ],
    TareaController.crearTarea
);

router.get('/:proyecto',
    authMiddleware,
    [check('proyecto','El proyecto es obligatorio.').not().isEmpty()],
    TareaController.listadoTarea
);

router.delete('/',
    authMiddleware,
    TareaController.eliminarTarea
)

router.put('/',
    authMiddleware,
    [
        check('nombre','El nombre es obligatorio.').not().isEmpty(),
        check('proyecto','El proyecto es obligatorio.').not().isEmpty(),
        check('estado','El estado es obligatorio.').not().isEmpty()
    ],
    TareaController.editarTarea
)

module.exports = router;