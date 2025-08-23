const express = require('express');
const router = express.Router();
const { conexion } = require('./Configuracion/conexion');

router.get("/donantes", (req, res) => {
    const query = `
        SELECT 
            D.id_donante,
            D.nombre,
            D.apellido,
            D.email,
            D.celular,
            D.ci,
            D.peso,
            D.fecha_nacimiento,
            TS.tipo AS TipoSangre,
            TS.factor_rh AS FactorRH,
            D.estado_donante,
            ES.estado AS EstadoSalud
        FROM Donantes D
        LEFT JOIN TiposSangre TS ON D.id_tipo_sangre = TS.id_tipo_sangre
        LEFT JOIN EstadoSalud ES ON D.id_estadoSalud = ES.id_estadoSalud
    `;
    conexion.query(query, (err, result) => {
        if (err) {
            console.log('Error en la consulta', err);
            res.status(500).json({ mensaje: 'Error al obtener donantes' });
        } else {
            res.json(result);
        }
    });
});


router.post("/donantes", (req, res) => {
    let sqlMax = 'SELECT IFNULL(MAX(id_donante), 0) AS maxId FROM Donantes';
    conexion.query(sqlMax, (err, result) => {
        if (err) {
            console.log('Error al obtener último id_donante', err);
            return res.status(500).json({ mensaje: 'Error al generar ID' });
        }

        let nuevoId = result[0].maxId + 1;

        let data = {
            id_donante: nuevoId,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            celular: req.body.celular,
            ci: req.body.ci,
            peso: req.body.peso,
            fecha_nacimiento: req.body.fecha_nacimiento,
            id_tipo_sangre: req.body.id_tipo_sangre,
            estado_donante: req.body.estado_donante,
            id_estadoSalud: req.body.id_estadoSalud
        };

        let sqlInsert = 'INSERT INTO Donantes SET ?';
        conexion.query(sqlInsert, data, (err, resul) => {
            if (err) {
                console.log('Error en el insert', err);
                res.status(500).json({ mensaje: 'Error al insertar donante' });
            } else {
                res.json({
                    mensaje: 'Donante creado correctamente',
                    id_generado: nuevoId,
                    data: data
                });
            }
        });
    });
});


router.put("/donantes/:id", (req, res) => {
    let id = req.params.id;
    let { nombre, apellido, email, celular, ci, peso, fecha_nacimiento, id_tipo_sangre, estado_donante, id_estadoSalud } = req.body;

    let sql = `
        UPDATE Donantes 
        SET nombre = ?, apellido = ?, email = ?, celular = ?, ci = ?, peso = ?, fecha_nacimiento = ?, 
            id_tipo_sangre = ?, estado_donante = ?, id_estadoSalud = ?
        WHERE id_donante = ?`;

    conexion.query(sql, [nombre, apellido, email, celular, ci, peso, fecha_nacimiento, id_tipo_sangre, estado_donante, id_estadoSalud, id], (err, result) => {
        if (err) {
            console.log('Error en el update', err);
            res.status(500).json({ mensaje: 'Error al actualizar donante' });
        } else {
            res.json({ mensaje: 'Donante actualizado correctamente' });
        }
    });
});


router.delete("/donantes/:id", (req, res) => {
    let id = req.params.id;
    let sql = 'DELETE FROM Donantes WHERE id_donante = ?';

    conexion.query(sql, [id], (err, result) => {
        if (err) {
            console.log('Error al eliminar donante', err);
            res.status(500).json({ mensaje: 'Error al eliminar' });
        } else {
            res.json({ mensaje: 'Donante eliminado correctamente' });
        }
    });
});

module.exports = router;
