const express = require('express');
const { nuevousuario } = require('../controllers/usuarioController');
const { check } = require('express-validator');
const router = express.Router();

// Craer un nuevo Usuario
router.post('/',
    [
        check('nombre', 'El Nombre es Obligatorio').not().isEmpty(),
        check('email', 'Agrega un email válido').isEmail(),
        check('password', 'El password debe ser de al menos 6 caracteres').isLength({ min: 6 }),
    ],
    nuevousuario
);


router.get('/',);


module.exports = router;