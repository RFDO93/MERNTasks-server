const mongoose = require('mongoose');

const TareaSchema = mongoose.Schema({
    nombre:{
        type:String,
        trim:true,
        required:true,
    },
    estado:{
        type:Boolean,
        default:false
    },
    proyecto:{
        type:mongoose.Types.ObjectId,
        ref:'Proyecto'
    },
    creador:{
        type:mongoose.Types.ObjectId,
        ref:'Usuario'
    },
    creado:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model('Tarea',TareaSchema);