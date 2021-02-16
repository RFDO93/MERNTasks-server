const UsuarioModel = require('../models/UsuarioModel');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req,res) => {
    //Revisar si hay errores
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }

    const {email, password} = req.body;

    try {
        //revisar que sea un usuario registrado
        let usuario = await UsuarioModel.findOne({ email });

        if(!usuario){
            return res.status(400).json({msg: "El usuario no existe."});
        }

        //Revisar el password
        const passCorrecto = await bcryptjs.compare(password,usuario.password);
        if(!passCorrecto){
            return res.status(400).json({msg: 'Password Incorrecto'});
        }

        //crear y firmar el JWT
        const payload = {
            usuario: {
                id: usuario.id
            }
        }

        //firmar
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 7200,
        }, (error, token) => {
            if(error) 
                throw error;

            return res.json({msg:'Usuario ingreso con éxito.',token,usuario:{_id:usuario._id,nombre:usuario.nombre,email:usuario.email}});
        })

    } catch (error) {
        
    }
}