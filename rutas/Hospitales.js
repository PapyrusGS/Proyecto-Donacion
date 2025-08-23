const express = require('express');
const router = express.Router();
const { conexion } = require('./Configuracion/conexion');


router.get('/hospitales', (req, res) => {
    let sql = "SELECT id_hospital, tipo, nombre, direccion, celular, director FROM Hospitales";
    conexion.query(sql, (err, result) => {
        if (err) {
            console.log('Error en la consulta', err);
            res.status(500).json({ mensaje: 'Error al obtener hospitales' });
        } else {
            res.json(result);
        }
    });
});


router.post('/hospitales', (req, res) => {
    let sqlMax = 'SELECT IFNULL(MAX(id_hospital), 0) AS maxId FROM Hospitales';
    conexion.query(sqlMax, (err, result) => {
        if (err) {
            console.log('Error al obtener último id_hospital', err);
            return res.status(500).json({ mensaje: 'Error al generar ID' });
        }

        let nuevoId = result[0].maxId + 1;

        let data = {
            id_hospital: nuevoId,
            tipo: req.body.tipo,
            nombre: req.body.nombre,
            direccion: req.body.direccion,
            celular: req.body.celular,
            director: req.body.director
        };

        let sqlInsert = 'INSERT INTO Hospitales SET ?';
        conexion.query(sqlInsert, data, (err, resul) => {
            if (err) {
                console.log('Error en el insert', err);
                res.status(500).json({ mensaje: 'Error al insertar hospital' });
            } else {
                res.json({ 
                    mensaje: 'Hospital creado correctamente', 
                    id_generado: nuevoId, 
                    data: data 
                });
            }
        });
    });
});


router.put('/hospitales/:id', (req, res) => {
    let id = req.params.id;
    let { tipo, nombre, direccion, celular, director } = req.body;

    let sql = `UPDATE Hospitales 
               SET tipo = ?, nombre = ?, direccion = ?, celular = ?, director = ?
               WHERE id_hospital = ?`;

    conexion.query(sql, [tipo, nombre, direccion, celular, director, id], (err, result) => {
        if (err) {
            console.log('Error en el update', err);
            res.status(500).json({ mensaje: 'Error al actualizar hospital' });
        } else {
            res.json({ mensaje: 'Hospital actualizado correctamente' });
        }
    });
});


router.delete('/hospitales/:id', (req, res) => {
    let id = req.params.id;
    let sql = 'DELETE FROM Hospitales WHERE id_hospital = ?';

    conexion.query(sql, [id], (err, result) => {
        if (err) {
            console.log('Error al eliminar hospital', err);
            res.status(500).json({ mensaje: 'Error al eliminar' });
        } else {
            res.json({ mensaje: 'Hospital eliminado correctamente' });
        }
    });
});

module.exports = router;
