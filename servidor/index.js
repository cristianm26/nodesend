const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');
// Rutas importadas
const usuarioRoute = require('./routes/usuariosRoute');
const authRoute = require('./routes/authRoute');
const enlaceRoute = require('./routes/enlaceRoute');
const archivosRoute = require('./routes/archivosRoute');

// crear el servidor
const app = express();

// Conectar a la base de datos
conectarDB();
// Habilitar Cors

app.use(cors());
// Puero de la app
const port = process.env.port || 4000;

// Habilitar leer los valores de un body
app.use(express.json())
// Habilitar carpeta publica
app.use(express.static('uploads'));

// Rutas de la app
app.use('/api/usuarios', usuarioRoute);
app.use('/api/auth', authRoute);
app.use('/api/enlaces', enlaceRoute);
app.use('/api/archivos', archivosRoute)
// arrancar la app
app.listen(port, '0.0.0.0', () => {
    console.log(`El servidor esta funcionando ${port}`)
})
