const express = require('express');
const router = express.Router();
const { conexion } = require('./Configuracion/conexion');


router.get("/organos", (req, res) => {

    let sql = "SELECT * FROM organos";

    conexion.query(sql,(err,result) =>{

        if (err) {

            console.log('Error');

            throw err;

        } else {

            res.json(result);

        }

    })

});

module.exports = router;
