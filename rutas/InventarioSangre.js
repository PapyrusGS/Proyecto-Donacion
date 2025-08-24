const express = require('express');
const router = express.Router();
const { conexion } = require('./Configuracion/conexion');

router.get("/inventario", (req, res) => {
    const query = `
        SELECT 
            I.id_inventario,
            TS.tipo AS TipoSangre,
            TS.factor_rh AS FactorRH,
            H.nombre AS Hospital,
            I.id_donacion,
            I.cantidad,
            I.fecha_ingreso,
            I.fecha_vencimiento,
            I.estado
        FROM InventarioSangre I
        LEFT JOIN TiposSangre TS ON I.id_tipo_sangre = TS.id_tipo_sangre
        LEFT JOIN Hospitales H ON I.id_hospital = H.id_hospital
    `;
    conexion.query(query, (err, result) => {
        if (err) {
            console.log("Error en la consulta", err);
            res.status(500).json({ mensaje: "Error al obtener inventario" });
        } else {
            res.json(result);
        }
    });
});

router.post("/inventario", (req, res) => {
    let sqlMax = "SELECT IFNULL(MAX(id_inventario), 0) AS maxId FROM InventarioSangre";
    conexion.query(sqlMax, (err, result) => {
        if (err) return res.status(500).json({ mensaje: "Error al generar ID" });

        let nuevoId = result[0].maxId + 1;

        let data = {
            id_inventario: nuevoId,
            id_tipo_sangre: req.body.id_tipo_sangre,
            id_hospital: req.body.id_hospital,
            id_donacion: req.body.id_donacion,
            cantidad: req.body.cantidad,
            fecha_ingreso: req.body.fecha_ingreso,
            fecha_vencimiento: req.body.fecha_vencimiento,
            estado: req.body.estado
        };

        let sqlInsert = "INSERT INTO InventarioSangre SET ?";
        conexion.query(sqlInsert, data, (err, resul) => {
            if (err) return res.status(500).json({ mensaje: "Error al insertar inventario" });

            res.json({ mensaje: "Inventario registrado correctamente", id_generado: nuevoId, data });
        });
    });
});

router.put("/inventario/:id", (req, res) => {
    let id = req.params.id;
    let { id_tipo_sangre, id_hospital, id_donacion, cantidad, fecha_ingreso, fecha_vencimiento, estado } = req.body;

    let sql = `
        UPDATE InventarioSangre
        SET id_tipo_sangre = ?, id_hospital = ?, id_donacion = ?, cantidad = ?, 
            fecha_ingreso = ?, fecha_vencimiento = ?, estado = ?
        WHERE id_inventario = ?`;

    conexion.query(sql, [id_tipo_sangre, id_hospital, id_donacion, cantidad, fecha_ingreso, fecha_vencimiento, estado, id], (err, result) => {
        if (err) return res.status(500).json({ mensaje: "Error al actualizar inventario" });

        res.json({ mensaje: "Inventario actualizado correctamente" });
    });
});

router.delete("/inventario/:id", (req, res) => {
    let id = req.params.id;
    let sql = "DELETE FROM InventarioSangre WHERE id_inventario = ?";

    conexion.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ mensaje: "Error al eliminar inventario" });

        res.json({ mensaje: "Inventario eliminado correctamente" });
    });
});

module.exports = router;
