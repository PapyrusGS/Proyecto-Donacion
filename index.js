const { app, puerto } = require('./rutas/Configuracion/conexion');

const Enfermeras = require('./rutas/Enfermeras');
const Hospitales = require('./rutas/Hospitales');
const Donantes = require('./rutas/Donantes');


app.use('/proyecto', Enfermeras);
app.use('/proyecto', Hospitales);
app.use('/proyecto', Donantes);


app.listen(puerto, () => {
  console.log(`Servidor levantado en ${puerto}`);
});