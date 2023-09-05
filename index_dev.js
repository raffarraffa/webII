import express from 'express';
import { getPreguntas } from "./v1/controllers/main_src.js";
const url = 'https://restcountries.com/v3.1/all';
const tpi = express();
const port = 8081;
const DEV = true;

if (DEV) {
  tpi.use((req, res, next) => {
    res.header("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    console.log(`Peticion ${req.method} ruta ${req.originalUrl} Sin cache`);
    next();
  });
}
tpi.get(`/preguntas`, async (req, res) => {
  //  res.send(`<h1>Trabajo Practico Integrador WEB 2 </h1><h2><em>respuesta realizada ${new Date()} : Método petición ${req.method}  ${req.originalUrl} </em></h2>`);
  res.send(await getPreguntas(url));
});
// ruta  archivo HTML default
tpi.get('/', (req, res) => {
  const indexPath = `./views/index.html`;
  res.sendFile(indexPath);
});
tpi.listen(port, () => {
  console.log(`Servidor Express en ejecución en http://localhost:${port}`);
});


console.log(await getPreguntas(url));
