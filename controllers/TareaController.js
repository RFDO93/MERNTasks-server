const TareaModel = require('../models/TareaModel');
const ProyectoModel = require('../models/ProyectoModel');
const {validationResult} = require('express-validator');

exports.crearTarea = async (req,res) => {

    //Comprobamos que no tenga errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores});
    }

    try {

        //Comprobamos que el proyecto enviado existe.
        let proyecto = await ProyectoModel.findOne({_id:req.body.proyecto});

        if(!proyecto){
            return res.status(400).json({msg:"Proyecto no existe."});
        }

        //Comprobamos si este proyecto le pertenece a dicha persona
        if(proyecto.creador != req.usuario.id){
            return res.status(400).json({msg:"No tiene autorización para crear tareas en este proyecto."});
        }
        
        let tarea = new TareaModel(req.body);
        tarea.creador = req.usuario.id;
        await tarea.save();

        res.json({msg:'Tarea creada exitosamente',tarea})
    } catch (error) {
        res.status(400).json({msg:'Hubo un error.'});
    }
}

exports.listadoTarea = async (req,res) => {

    //Comprobamos que no tenga errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores});
    }

    try {

        //Comprobamos que el proyecto enviado existe.
        let proyecto = await ProyectoModel.findOne({_id:req.params.proyecto});

        if(!proyecto){
            return res.status(400).json({msg:"Proyecto no existe."});
        }

        //Comprobamos si este proyecto le pertenece a dicha persona
        if(proyecto.creador != req.usuario.id){
            return res.status(400).json({msg:"No tiene autorización para listar las tareas de este proyecto."});
        }
        
        //Realizamos la consulta del listado de tarea del proyecto enviado.
        let tarea =await TareaModel.find({proyecto:proyecto._id}).exec();
        res.json({tarea})
    } catch (error) {
        res.status(400).json({msg:'Hubo un error.'});
    }
}

exports.eliminarTarea = async (req,res) => {
    //Comprobamos que no tenga errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores});
    }

    try {

        let tarea = await TareaModel.findById(req.body._id)

        //Comprobamos que la tarea existe
        if(!tarea){
            return res.status(400).json({msg:"Tarea no existe."})
        }

        //Comprobamos si este proyecto le pertenece a dicha persona
        if(tarea.creador != req.usuario.id){
            return res.status(400).json({msg:"No tiene autorización para Eliminar esta tarea."});
        }

        tarea.delete();
        res.json({msg:"Tarea eliminada con éxito.",tarea});
    } catch (error) {
        res.status(400).json({msg:'Hubo un error.'});
    }
}

exports.editarTarea = async (req,res) => {
    //Comprobamos que no tenga errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores});
    }

    //Extraemos los campos a modificar
    const {nombre, estado} = req.body;

    try {

        let tarea = await TareaModel.findById(req.body._id)

        //Comprobamos que la tarea existe
        if(!tarea){
            return res.status(400).json({msg:"Tarea no existe."})
        }

        //Comprobamos que el proyecto enviado existe.
        let proyecto = await ProyectoModel.findOne({_id:req.body.proyecto});

        if(!proyecto){
            return res.status(400).json({msg:"Proyecto no existe."});
        }

        //Comprobamos si este proyecto le pertenece a dicha persona
        if(proyecto.creador != req.usuario.id){
            return res.status(400).json({msg:"No tiene autorización para crear tareas en este proyecto."});
        }

        //Realizamos la actualización 
        tarea.nombre = nombre;
        tarea.estado = estado;
        tarea.save();

        res.json({msg:"Tarea editada con éxito.",tarea});
    } catch (error) {
        res.status(400).json({msg:'Hubo un error.'});
    }
}