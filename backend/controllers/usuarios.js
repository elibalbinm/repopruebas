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

        // if (rol && rol != 'ROL_ALUMNO' && rol != 'ROL_PROFESOR' && rol != 'ROL_ADMIN') {
        //     return res.status(400).json({
        //         ok: false,
        //         msg: 'Rol incorrecto'
        //     });
        // }

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

const actualizarUsuario = async(req, res = response) => {
    // Asegurarnos de que aunque venga el pass no se va a actualizar,
    // la modificacion del pass es otra llamada

    // Comprobar que si cambia el email no existe ya en la BD, si no existe -> cambiarlo
    const { password, email, ...object } = req.body;
    const uid = req.params.id;

    try {
        // Comprobar si está intentando cambiar el email, que no coincida con alguno que ya esté en BD
        // Obtenemos si hay un usuario en BD con el email que nos llega en post
        const existeEmail = await Usuario.findOne({ email: email });

        if (existeEmail) {
            // Si existe un usuario con ese email
            // Comprobamos que sea el suyo, el UID ha de ser igual, sino el email está en uso
            if (existeEmail._id != uid) {
                // const valor = existeEmail._id;

                return res.status(400).json({
                    ok: false,
                    msg: 'Email ya existe'
                });
            }
        }

        // Llegando aquí el email o es el mismo o no está en BD
        object.email = email;

        // Al haber extraido pass el req.body nunca se va a enviar en este put
        const usuario = await Usuario.findByIdAndUpdate(uid, object, { new: true });

        res.json({
            ok: true,
            msg: 'Usuario actualizado',
            usuario: usuario
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Error creando usuario'
        });
    }
}

const borrarUsuario = async(req, res = response) => {
    const uid = req.params.id;

    try {
        const existeUsuario = await Usuario.findById(uid);
        if (!existeUsuario) {
            return res.status(400).json({
                ok: true,
                msg: 'El usuario no existe'
            });
        }

        //Lo eliminamos y devolvemos el usuario recién eliminado
        const resultado = await Usuario.findByIdAndRemove(uid);

        res.json({
            ok: true,
            msg: 'Usuario eliminado',
            resultado: resultado
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: true,
            msg: 'Error borrando usuario'
        });
    }
}

module.exports = { obtenerUsuarios, crearUsuario, actualizarUsuario, borrarUsuario }