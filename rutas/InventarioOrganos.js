const express = require("express");
const router = express.Router();
const { conexion } = require("./Configuracion/conexion");

router.get("/inventarioorganos", (req, res) => {
    const query = `
        SELECT 
            I.id_inventario,
            O.nombre AS organo,
            H.nombre AS hospital,
            I.id_donacion,
            I.fecha_ingreso,
            I.fecha_vencimiento,
            I.estado
        FROM InventarioOrganos I
        LEFT JOIN Organos O ON I.id_organo = O.id_organo
        LEFT JOIN Hospitales H ON I.id_hospital = H.id_hospital
    `;
    conexion.query(query, (err, result) => {
        if (err) {
            console.log("Error en la consulta", err);
            res.status(500).json({ mensaje: "Error al obtener inventario de órganos" });
        } else {
            res.json(result);
        }
    });
});

router.post("/inventarioorganos", (req, res) => {
    let sqlMax = "SELECT IFNULL(MAX(id_inventario), 0) AS maxId FROM InventarioOrganos";
    conexion.query(sqlMax, (err, result) => {
        if (err) return res.status(500).json({ mensaje: "Error al generar ID" });

        let nuevoId = result[0].maxId + 1;

        let data = {
            id_inventario: nuevoId,
            id_organo: req.body.id_organo,
            id_hospital: req.body.id_hospital,
            id_donacion: req.body.id_donacion,
            fecha_ingreso: req.body.fecha_ingreso,
            fecha_vencimiento: req.body.fecha_vencimiento,
            estado: req.body.estado
        };

        let sqlInsert = "INSERT INTO InventarioOrganos SET ?";
        conexion.query(sqlInsert, data, (err, resul) => {
            if (err) return res.status(500).json({ mensaje: "Error al insertar inventario" });

            res.json({ mensaje: "Órgano registrado en inventario correctamente", id_generado: nuevoId, data });
        });
    });
});

router.put("/inventarioorganos/:id", (req, res) => {
    let id = req.params.id;
    let { id_organo, id_hospital, id_donacion, fecha_ingreso, fecha_vencimiento, estado } = req.body;

    let sql = `
        UPDATE InventarioOrganos
        SET id_organo=?, id_hospital=?, id_donacion=?, fecha_ingreso=?, fecha_vencimiento=?, estado=?
        WHERE id_inventario=?`;

    conexion.query(sql, [id_organo, id_hospital, id_donacion, fecha_ingreso, fecha_vencimiento, estado, id], (err, result) => {
        if (err) return res.status(500).json({ mensaje: "Error al actualizar inventario" });

        res.json({ mensaje: "Inventario de órganos actualizado correctamente" });
    });
});

router.delete("/inventarioorganos/:id", (req, res) => {
    let id = req.params.id;
    let sql = "DELETE FROM InventarioOrganos WHERE id_inventario = ?";

    conexion.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ mensaje: "Error al eliminar inventario" });

        res.json({ mensaje: "Órgano eliminado del inventario correctamente" });
    });
});

module.exports = router;
