const UsuarioModel = require('../models/UsuarioModel');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

//Crear usuario
exports.crearUsuario = async (req,res) => {

    //Revisar si hay errores
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }

    const {email, password, nombre} = req.body;

    try {
        //Comprobar usuario existente. 
        let usuario = await UsuarioModel.findOne({ email });

        if(usuario){
            return res.status(401).json({msg:'Usuario ya existe.'});
        }

        // Crear Nuevo Usuario
        let newUsuario = new UsuarioModel(req.body);

        // Hashear el password
        const salt = await bcryptjs.genSalt(10);
        newUsuario.password = await bcryptjs.hash(password,salt);

        //Guardar usuario
        await newUsuario.save();

        //crear y firmar el JWT
        const payload = {
            usuario: {
                id: newUsuario.id
            }
        }

        //firmar
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 7200,
        }, (error, token) => {
            if(error) 
                throw error;

            return res.json({msg:'Usuario creado con éxito.',token});
        })

        
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:'Hubo un error.'});
    }
}

exports.getUser = async (req,res) => {
    try {
        let usuario = await UsuarioModel.findById(req.usuario.id);

        if(!usuario){
            return res.status(400).json({msg:'Hubo un error.'});
        }

        return res.json({usuario:{_id:usuario._id,nombre:usuario.nombre,email:usuario.email}});
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:'Hubo un error.'});
    }
}