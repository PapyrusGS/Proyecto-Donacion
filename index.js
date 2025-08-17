const express = require('express');
const mysql = require('mysql2');
const app = express();
const puerto = 3000;

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

app.get('/Donaciones', (req,res) => {
    const sql = `Select * from donantes`;
    conexion.query(sql,(err,result) =>{
        if (err) {
            console.log('Error');
            throw err;
        } else {
            res.json(result);
        }
    })
})

app.listen (puerto, () =>{
    console.log('Servidor levantado en el Puerto: '+ puerto);
})
