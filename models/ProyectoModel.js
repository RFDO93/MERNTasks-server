const mongoose = require('mongoose');

const ProyectoModel = mongoose.Schema({
    nombre:{
        type:String,
        require:true,
        trim:true
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

module.exports = mongoose.model('Proyecto',ProyectoModel);