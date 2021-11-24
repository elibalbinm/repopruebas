// Importación de módulos
const express = require('express');
const cors = require('cors');
const http = require('http');

// Agregamos Dotenv
// Busca el archivo .env en la raiz de nuestro proyecto y carga las variables
// que en ese archivo esten declaradas en una variable llamada process.env
require('dotenv').config();
// Importar base de datos
const { dbConnection } = require('./database/configdb');
// Crear una aplicación de express
const app = express();
const hostname = 'localhost';
const port = 3000;

dbConnection();

app.use(cors());
//Construye la request como si fuese un JSON
app.use(express.json());
app.use('/api/usuarios', require('./routes/usuarios'));
// Abrir la aplicacíon en el puerto 3000
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
});

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    res.end('Hello World!\n');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
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