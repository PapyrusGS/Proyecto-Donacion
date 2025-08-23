const express = require('express');
const router = express.Router();
const { conexion } = require('./Configuracion/conexion');


router.get('/enfermeras', (req, res) => {
    let sql = "SELECT id_enfermera, nombre, usuario, contrasena FROM Enfermeras";
    conexion.query(sql, (err, result) => {
        if (err) {
            console.log('Error en la consulta', err);
            res.status(500).json({ mensaje: 'Error al obtener enfermeras' });
        } else {
            res.json(result);
        }
    });
});


router.post('/enfermeras', (req, res) => {
    let sqlMax = 'SELECT IFNULL(MAX(id_enfermera), 0) AS maxId FROM Enfermeras';
    conexion.query(sqlMax, (err, result) => {
        if (err) {
            console.log('Error al obtener último id_enfermera', err);
            return res.status(500).json({ mensaje: 'Error al generar ID' });
        }
        let nuevoId = result[0].maxId + 1;
        let data = {
            id_enfermera: nuevoId,
            nombre: req.body.nombre,
            usuario: req.body.usuario,
            contrasena: req.body.contrasena
        };
        let sqlInsert = 'INSERT INTO Enfermeras SET ?';
        conexion.query(sqlInsert, data, (err, resul) => {
            if (err) {
                console.log('Error en el insert', err);
                res.status(500).json({ mensaje: 'Error al insertar enfermera' });
            } else {
                res.json({ 
                    mensaje: 'Enfermera creada correctamente', 
                    id_generado: nuevoId, 
                    data: data 
                });
            }
        });
    });
});

router.put('/enfermeras/:id', (req, res) => {
    let id = req.params.id;
    let { nombre, usuario, contrasena } = req.body;

    let sql = `UPDATE Enfermeras 
               SET nombre = ?, usuario = ?, contrasena = ?
               WHERE id_enfermera = ?`;

    conexion.query(sql, [nombre, usuario, contrasena, id], (err, result) => {
        if (err) {
            console.log('Error en el update', err);
            res.status(500).json({ mensaje: 'Error al actualizar enfermera' });
        } else {
            res.json({ mensaje: 'Enfermera actualizada correctamente' });
        }
    });
});


router.delete('/enfermeras/:id', (req, res) => {
    let id = req.params.id;
    let sql = 'DELETE FROM Enfermeras WHERE id_enfermera = ?';

    conexion.query(sql, [id], (err, result) => {
        if (err) {
            console.log('Error al eliminar enfermera', err);
            res.status(500).json({ mensaje: 'Error al eliminar' });
        } else {
            res.json({ mensaje: 'Enfermera eliminada correctamente' });
        }
    });
});

module.exports = router;
