// Importación de módulos
const express = require('express');
const cors = require('cors');
// Agregamos Dotenv
// Busca el archivo .env en la raiz de nuestro proyecto y carga las variables
// que en ese archivo esten declaradas en una variable llamada process.env
require('dotenv').config();
// Importar base de datos
const { dbConnection } = require('./database/configdb');
// Crear una aplicación de express
const app = express();

dbConnection();

app.use(cors());
//Construye la request como si fuese un JSON
app.use(express.json());
app.use('/api/usuarios', require('./routes/usuarios'));
// Abrir la aplicacíon en el puerto 3000
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
});

/*
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Respuesta'
    });
});

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto ' + 3000);
});*/