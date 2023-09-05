import express from 'express';
import compression from 'compression';
import { getPreguntas } from "./v1/controllers/main_src.js";
const url = 'https://restcountries.com/v3.1/all';
const tpi = express();
const port = 8080;
const DEV = true;
tpi.use(compression());
tpi.use(express.json());
tpi.use(compression());
tpi.use(express.static('public'));
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
  console.log('sirvideno index');
  const inde = "/index.html";
  res.sendFile(inde);
  //res.send(`<h1>Trabajo Practico Integrador WEB 2 </h1><h2><em>respuesta realizada ${new Date()} : Método petición ${req.method}  ${req.originalUrl} </em></h2>`);
});
tpi.listen(port, () => {
  console.log(`Servidor Express en ejecución en http://localhost:${port}`);
});


//console.log(await getPreguntas(url));
