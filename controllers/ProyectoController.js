const ProyectoModel = require('../models/ProyectoModel');
const { validationResult } = require('express-validator');

exports.crearProyecto = async (req, res) => {
    //Revisar si hay errores
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }

    try {
        
        let proyecto = new ProyectoModel(req.body);
        proyecto.creador = req.usuario.id;
        await proyecto.save();

        res.json({
            msg:"Proyecto creado con éxito.",
            proyecto
        })

    } catch (error) {
        res.status(400).json({msg: 'Hubo un error'});
    }
}

exports.listarProyecto = async (req, res) => {
    try {
        
        let proyectos = await ProyectoModel.find({creador:req.usuario.id}).exec();
        res.json({proyectos})

    } catch (error) {
        console.log(error);
        res.status(400).json({msg: 'Hubo un error'});
    }
}

exports.eliminarProyecto = async (req, res) => {
    //Revisar si hay errores
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }

    try {
        
        //Buscamos y comprobamos de que el proyecto existe.
        let proyecto = await ProyectoModel.findOne({_id:req.body.proyectoId});

        if(!proyecto){
            return res.status(400).json({msg:"Proyecto no existe."});
        }

        //Comprobamos si el proyecto le pertenece al usuario. 
        if(proyecto.creador != req.usuario.id){
            return res.status(400).json({msg:"No tiene autorización para eliminar este proyecto."});
        }

        proyecto.delete();

        res.json({msg:"Proyecto eliminado con éxito.",proyecto});

    } catch (error) {
        res.status(400).json({msg: 'Hubo un error'});
    }
}

exports.editarProyecto = async (req, res) => {
    //Revisar si hay errores
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }

    try {
        
        //Buscamos y comprobamos de que el proyecto existe.
        let proyecto = await ProyectoModel.findOne({_id:req.body._id});

        if(!proyecto){
            return res.status(400).json({msg:"Proyecto no existe."});
        }

        //Comprobamos si el proyecto le pertenece al usuario. 
        if(proyecto.creador != req.usuario.id){
            return res.status(400).json({msg:"No tiene autorización para eliminar este proyecto."});
        }

        proyecto.nombre = req.body.nombre;
        proyecto.save();

        res.json({msg:"Proyecto editado con éxito.",proyecto});

    } catch (error) {
        res.status(400).json({msg: 'Hubo un error'});
    }
}