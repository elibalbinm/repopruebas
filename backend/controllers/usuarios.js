const Usuario = require('../models/usuarios');
const { validationResult } = require('express-validator');
const { response } = require('express');
const bcrypt = require('bcryptjs');

const obtenerUsuarios = async(req, res) => {

    const usuarios = await Usuario.find({});
    // const usuarios = await Usuario.find({}, 'nombre apellidos');
    res.json({
        ok: true,
        msg: 'getUsuarios',
        usuarios
    });
}

const crearUsuario = async(req, res = response) => {
    const erroresVal = validationResult(req);
    const { email, password, rol } = req.body;

    // VALIDACIONES
    try {
        const existeEmail = await Usuario.findOne({ email: email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'Email ya existe'
            });
        }

        if (rol && rol != 'ROL_ALUMNO' && rol != 'ROL_PROFESOR' && rol != 'ROL_ADMIN') {
            return res.status(400).json({
                ok: false,
                msg: 'Rol incorrecto'
            });
        }

        const salt = bcrypt.genSaltSync();
        const cpassword = bcrypt.hashSync(password, salt);

        // Almacenar en la base de datos
        const usuario = new Usuario(req.body);
        usuario.password = cpassword;

        await usuario.save();

        res.json({
            ok: true,
            msg: 'crearUsuarios',
            usuario
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Error creando usuario'
        });
    }

    if (!erroresVal.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errores: erroresVal.mapped()
        });
    }
}

const actualizarUsuario = async(req, res) => {
    res.json({
        ok: true,
        msg: 'actualizarUsuario'
    });
}
const borrarUsuario = async(req, res) => {
    res.json({
        ok: true,
        msg: 'borrarUsuario'
    });
}

module.exports = { obtenerUsuarios, crearUsuario, actualizarUsuario, borrarUsuario }