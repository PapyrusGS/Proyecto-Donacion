const { app, puerto } = require('./rutas/Configuracion/conexion');

const Enfermeras = require('./rutas/Enfermeras');
const Hospitales = require('./rutas/Hospitales');
const Donantes = require('./rutas/Donantes');
const TiposSangre = require('./rutas/TiposSangre');
const EstadoSalud = require('./rutas/EstadoSalud');
const DetalleDonacion = require('./rutas/DetalleDonacion');
const Donaciones = require('./rutas/Donaciones');
const InventarioOrganos = require('./rutas/InventarioOrganos');
const InventarioSangre = require('./rutas/InventarioSangre');
const Organos = require('./rutas/Organos');


app.use('/proyecto', Enfermeras);
app.use('/proyecto', Hospitales);
app.use('/proyecto', Donantes);
app.use('/proyecto', TiposSangre);
app.use('/proyecto', EstadoSalud);
app.use('/proyecto', DetalleDonacion);
app.use('/proyecto', Donaciones);
app.use('/proyecto', InventarioOrganos);
app.use('/proyecto', InventarioSangre);
app.use('/proyecto', Organos);


app.listen(puerto, () => {
  console.log(`Servidor levantado en ${puerto}`);
});