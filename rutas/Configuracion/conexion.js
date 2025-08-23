const express = require('express');
const mysql = require('mysql2');
const app = express();
puerto = 3000;
app.use(express.json());

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '252005will',
    database: 'Donaciones'
});

conexion.connect ((err) => {
 if (err){
    throw err
 } else {
    console.log ('Conexion exitosa');
  }
})

app.listen (puerto, () =>{
    console.log('Servidor levantado');
})

module.exports = { app, conexion, puerto };