const express = require("express");
const router = express.Router();
const { conexion } = require("./Configuracion/conexion");

router.get("/donaciones", (req, res) => {
    const query = `
        SELECT 
            D.id_donacion,
            H.nombre AS hospital,
            CONCAT(DT.nombre, ' ', DT.apellido) AS donante,
            E.nombre AS enfermera,
            D.estado,
            D.tipo_donacion,
            D.fecha_donacion,
            D.observaciones
        FROM Donaciones D
        LEFT JOIN Hospitales H ON D.id_hospital = H.id_hospital
        LEFT JOIN Donantes DT ON D.id_donante = DT.id_donante
        LEFT JOIN Enfermeras E ON D.id_enfermera = E.id_enfermera
    `;
    conexion.query(query, (err, result) => {
        if (err) {
            console.log("Error en la consulta", err);
            res.status(500).json({ mensaje: "Error al obtener donaciones" });
        } else {
            res.json(result);
        }
    });
});

router.post("/donaciones", (req, res) => {
    let sqlMax = "SELECT IFNULL(MAX(id_donacion), 0) AS maxId FROM Donaciones";
    conexion.query(sqlMax, (err, result) => {
        if (err) {
            console.log("Error al obtener último id_donacion", err);
            return res.status(500).json({ mensaje: "Error al generar ID" });
        }

        let nuevoId = result[0].maxId + 1;

        let data = {
            id_donacion: nuevoId,
            id_hospital: req.body.id_hospital,
            id_donante: req.body.id_donante,
            id_enfermera: req.body.id_enfermera,
            estado: req.body.estado,
            tipo_donacion: req.body.tipo_donacion,
            fecha_donacion: req.body.fecha_donacion,
            observaciones: req.body.observaciones
        };

        let sqlInsert = "INSERT INTO Donaciones SET ?";
        conexion.query(sqlInsert, data, (err, resul) => {
            if (err) {
                console.log("Error en el insert", err);
                res.status(500).json({ mensaje: "Error al insertar donación" });
            } else {
                res.json({
                    mensaje: "Donación registrada correctamente",
                    id_generado: nuevoId,
                    data: data
                });
            }
        });
    });
});

router.put("/donaciones/:id", (req, res) => {
    let id = req.params.id;
    let { id_hospital, id_donante, id_enfermera, estado, tipo_donacion, fecha_donacion, observaciones } = req.body;

    let sql = `
        UPDATE Donaciones 
        SET id_hospital=?, id_donante=?, id_enfermera=?, estado=?, tipo_donacion=?, fecha_donacion=?, observaciones=?
        WHERE id_donacion=?`;

    conexion.query(sql, [id_hospital, id_donante, id_enfermera, estado, tipo_donacion, fecha_donacion, observaciones, id], (err, result) => {
        if (err) {
            console.log("Error en el update", err);
            res.status(500).json({ mensaje: "Error al actualizar donación" });
        } else {
            res.json({ mensaje: "Donación actualizada correctamente" });
        }
    });
});

router.delete("/donaciones/:id", (req, res) => {
    let id = req.params.id;
    let sql = "DELETE FROM Donaciones WHERE id_donacion = ?";

    conexion.query(sql, [id], (err, result) => {
        if (err) {
            console.log("Error al eliminar donación", err);
            res.status(500).json({ mensaje: "Error al eliminar" });
        } else {
            res.json({ mensaje: "Donación eliminada correctamente" });
        }
    });
});

module.exports = router;

