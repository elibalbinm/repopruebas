// Ruta base
// /api/usuarios

const { Router } = require('express');
const { getUsuarios, crearUsuarios } = require('../controllers/usuarios');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');

const router = Router();

router.get('/', getUsuarios);
// router.post('/', crearUsuarios);
router.post('/', [
    check('nombre', 'El argumento nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearUsuarios);

module.exports = router;