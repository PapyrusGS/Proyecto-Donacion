const express = require('express');
const router = express.Router();
const { conexion } = require('./Configuracion/conexion');

router.get("/detalleDonacion", (req, res) => {
    const query = `
        SELECT 
            DD.id_detalle,
            DD.id_donacion,
            O.nombre AS Organo,
            TS.tipo AS TipoSangre,
            TS.factor_rh AS FactorRH,
            DD.cantidad
        FROM DetalleDonacion DD
        LEFT JOIN Organos O ON DD.id_organo = O.id_organo
        LEFT JOIN TiposSangre TS ON DD.id_tipo_sangre = TS.id_tipo_sangre
    `;
    conexion.query(query, (err, result) => {
        if (err) {
            console.log("Error en la consulta", err);
            res.status(500).json({ mensaje: "Error al obtener detalle de donaciones" });
        } else {
            res.json(result);
        }
    });
});

router.post("/detalleDonacion", (req, res) => {
    let sqlMax = "SELECT IFNULL(MAX(id_detalle), 0) AS maxId FROM DetalleDonacion";
    conexion.query(sqlMax, (err, result) => {
        if (err) return res.status(500).json({ mensaje: "Error al generar ID" });

        let nuevoId = result[0].maxId + 1;

        let data = {
            id_detalle: nuevoId,
            id_donacion: req.body.id_donacion,
            id_organo: req.body.id_organo,
            id_tipo_sangre: req.body.id_tipo_sangre,
            cantidad: req.body.cantidad
        };

        let sqlInsert = "INSERT INTO DetalleDonacion SET ?";
        conexion.query(sqlInsert, data, (err, resul) => {
            if (err) return res.status(500).json({ mensaje: "Error al insertar detalle donación" });

            res.json({ mensaje: "Detalle de donación registrado correctamente", id_generado: nuevoId, data });
        });
    });
});

router.put("/detalleDonacion/:id", (req, res) => {
    let id = req.params.id;
    let { id_donacion, id_organo, id_tipo_sangre, cantidad } = req.body;

    let sql = `
        UPDATE DetalleDonacion
        SET id_donacion = ?, id_organo = ?, id_tipo_sangre = ?, cantidad = ?
        WHERE id_detalle = ?`;

    conexion.query(sql, [id_donacion, id_organo, id_tipo_sangre, cantidad, id], (err, result) => {
        if (err) return res.status(500).json({ mensaje: "Error al actualizar detalle donación" });

        res.json({ mensaje: "Detalle de donación actualizado correctamente" });
    });
});

router.delete("/detalleDonacion/:id", (req, res) => {
    let id = req.params.id;
    let sql = "DELETE FROM DetalleDonacion WHERE id_detalle = ?";

    conexion.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ mensaje: "Error al eliminar detalle" });

        res.json({ mensaje: "Detalle de donación eliminado correctamente" });
    });
});

module.exports = router;
