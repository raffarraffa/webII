import express from "express";
/** pruebas cargar variables de entorno */
import { config } from 'dotenv';
const nodeEnv = process.env.NODE_ENV.trim();
if ('dev' === nodeEnv) {
  //require('dotenv').config({ path: '.env.dev' });
  config({ path: '.env.dev' });
  console.log('.env.dev cargado correctamente');
} else if (nodeEnv === 'prod') {
  config({ path: '.env.prod' });
  console.log('.env.prod cargado correctamente');
}
const databaseUrl = process.env.DATABASE_URL;
const secretKey = process.env.SECRET_KEY;
const debug = process.env.DEBUG;
const apiUrl = process.env.API_URL;
console.log(databaseUrl);
console.log(secretKey);
console.log(debug);
console.log(apiUrl);
/** fin pruebas carga entorno */

const app = express();
const currentDate = new Date();
const port = process.env.PORT ?? 8002;
// ste header no cache
if (debug) {
  app.use((req, res, next) => {
    res.header("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    console.log(`peticion ${req.method} ruta ${req.originalUrl} Sin cache`);
    next();
  });
}
app.use((req, res, next) => {
  res.header("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  next();
});

app.get("/", (req, res) => {
  res.send(`<h1>Trabajo Practico Integrador WEB 2 </h1><h2><em>Deploy realizado  ${currentDate} : Método petición ${req.method}  ${req.originalUrl} </em></h2>`);
});

app.use((req, res) => {
  res.status(404).send("<h1>Página no encontrada</h1>");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
