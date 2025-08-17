const express = require('express');
const mysql = require('mysql2');
const app = express();
const puerto = 3000;
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

app.get('/Donaciones', (req,res) => {
    const sql = `SELECT 
        d.id_donacion,
        CONCAT(do.nombre, ' ', do.apellido) AS donante,
        do.ci,
        do.email,
        d.tipo_donacion,
        COALESCE(o.nombre, ts.tipo) AS detalle_donado,
        COALESCE(dd.cantidad, 1) AS cantidad,
        h.nombre AS hospital,
        d.fecha_donacion,
        d.estado AS estado_donacion
            FROM Donaciones d
            INNER JOIN Donantes do ON d.id_donante = do.id_donante
            INNER JOIN Hospitales h ON d.id_hospital = h.id_hospital
            LEFT JOIN DetalleDonacion dd ON d.id_donacion = dd.id_donacion
            LEFT JOIN Organos o ON dd.id_organo = o.id_organo
            LEFT JOIN TiposSangre ts ON dd.id_tipo_sangre = ts.id_tipo_sangre
            ORDER BY d.fecha_donacion;`;
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
