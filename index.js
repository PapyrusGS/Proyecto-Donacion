const express = require('express');
const mysql = require('mysql2');
const app = express();
const puerto = 3000;
app.use(express.json());

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',   //Poner la clave de su mysql server
    database: 'donaciones'
});

conexion.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log('Conexion exitosa');
    }
});

// GET para la tabla ENFERMERAS
app.get("/enfermeras", (req, res) => {
    let sql = "SELECT * FROM enfermeras";
    conexion.query(sql,(err,result) =>{
        if (err) {
            console.log('Error');
            throw err;
        } else {
            res.json(result);
        }
    })
});

// GET para la tabla TIPOS DE SANGRE
app.get("/tipossangre", (req, res) => {
    let sql = "SELECT * FROM tipossangre";
    conexion.query(sql,(err,result) =>{
        if (err) {
            console.log('Error');
            throw err;
        } else {
            res.json(result);
        }
    });
});

// GET para el ESTADO DE SALUD
app.get("/estadosalud", (req, res) => {
    let sql = "SELECT * FROM estadosalud";
    conexion.query(sql,(err,result) =>{
        if (err) {
            console.log('Error');
            throw err;
        } else {
            res.json(result);
        }
    })
})

// GET para la tabla DONANTES 
app.get("/donantes", (req, res) => {
    const query = `
        SELECT 
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
    conexion.query(query,(err,result) =>{
        if (err) {
            console.log('Error');
            throw err;
        } else {
            res.json(result);
        }
    })
});

// GET para la tabla HOSPITALES
app.get("/hospitales", (req, res) => {
    let sql = "SELECT * FROM hospitales";
    conexion.query(sql,(err,result) =>{
        if (err) {
            console.log('Error');
            throw err;
        } else {
            res.json(result);
        }
    })
});

// GET para la tabla DONACIONES
app.get("/donaciones", (req, res) => {
    const query = `
        SELECT 
            Do.id_donacion,
            H.nombre AS NombreHospital,
            Don.nombre AS NombreDonante,
            E.nombre AS NombreEnfermera,
            Do.estado,
            Do.tipo_donacion,
            Do.fecha_donacion,
            Do.observaciones
        FROM Donaciones Do
        LEFT JOIN Hospitales H ON Do.id_hospital = H.id_hospital
        LEFT JOIN Donantes Don ON Do.id_donante = Don.id_donante
        LEFT JOIN Enfermeras E ON Do.id_enfermera = E.id_enfermera
    `;
    conexion.query(query,(err,result) =>{
        if (err) {
            console.log('Error');
            throw err;
        } else {
            res.json(result);
        }
    })
});

// GET para la tabla de ORGANOS
app.get("/organos", (req, res) => {
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

// GET para la tabla DETALLE DONACION
app.get("/detalledonacion", (req, res) => {
    const query = `
        SELECT 
            D.id_detalle,
            Don.nombre AS NombreDonante,
            Org.nombre AS NombreOrgano,
            TS.tipo AS TipoSangre,
            TS.factor_rh AS FactorRH,
            D.cantidad
        FROM DetalleDonacion D
        LEFT JOIN Donaciones Do ON D.id_donacion = Do.id_donacion
        LEFT JOIN Donantes Don ON Do.id_donante = Don.id_donante
        LEFT JOIN Organos Org ON D.id_organo = Org.id_organo
        LEFT JOIN TiposSangre TS ON D.id_tipo_sangre = TS.id_tipo_sangre
    `;
    conexion.query(query,(err,result) =>{
        if (err) {
            console.log('Error');
            throw err;
        } else {
            res.json(result);
        }
    })
});

// GET para la tabla INVENTARIO DE ORGANOS
app.get("/inventarioorganos", (req, res) => {
    const query = `
        SELECT 
            IO.id_inventario,
            Org.nombre AS NombreOrgano,
            H.nombre AS NombreHospital,
            IO.fecha_ingreso,
            IO.fecha_vencimiento,
            IO.estado
        FROM InventarioOrganos IO
        LEFT JOIN Organos Org ON IO.id_organo = Org.id_organo
        LEFT JOIN Hospitales H ON IO.id_hospital = H.id_hospital
    `;
    conexion.query(query,(err,result) =>{
        if (err) {
            console.log('Error');
            throw err;
        } else {
            res.json(result);
        }
    })
});

// GET para la tabla INVENTARIO DE SANGRE
app.get("/inventariosangre", (req, res) => {
    const query = `
        SELECT 
            ISg.id_inventario,
            TS.tipo AS TipoSangre,
            TS.factor_rh AS FactorRH,
            H.nombre AS NombreHospital,
            ISg.cantidad,
            ISg.fecha_ingreso,
            ISg.fecha_vencimiento,
            ISg.estado
        FROM InventarioSangre ISg
        LEFT JOIN TiposSangre TS ON ISg.id_tipo_sangre = TS.id_tipo_sangre
        LEFT JOIN Hospitales H ON ISg.id_hospital = H.id_hospital
    `;
    conexion.query(query,(err,result) =>{
        if (err) {
            console.log('Error');
            throw err;
        } else {
            res.json(result);
        }
    })
});

app.listen(puerto, () => {
    console.log('Servidor levantado en puerto ' + puerto);
});
