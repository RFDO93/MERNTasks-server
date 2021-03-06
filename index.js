const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');
//crear el servidor
const app = express();

//conectar la base de datos
conectarDB();

//Habilitando cors
app.use(cors());

//Habilitar express.json
app.use(express.json({ extended: true }));

//puerto de lapp
const port = process.env.PORT || 5000;

//Importar rutas
app.use('/api/usuario', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyecto', require('./routes/proyectos'));
app.use('/api/tarea', require('./routes/tareas'));

app.get('/', (req,res) => {
    res.send({ ok: true});
});

//arrancar la app
app.listen(port,'0.0.0.0',() => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});
