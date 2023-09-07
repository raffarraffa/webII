import express from 'express';
import compression from 'compression';
import cors from 'cors';
import { getPreguntas } from "./v1/controllers/main_src.js";
const url = 'https://restcountries.com/v3.1/all';
const tpi = express();
const port = 8080;
const DEV = true;
const corsOptions = {
  origin: ['http://127.0.0.1:5503','*'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  // credentials: true,
  optionsSuccessStatus: 204,
};
tpi.use(compression());
tpi.use(express.json());
tpi.use(cors(corsOptions));
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
tpi.use(compression());
tpi.use(express.static('public'));
tpi.get('/', (req, res) => {
  const inde = "/index.html";
  res.sendFile(inde);
});

tpi.get('/respuesta', (req, res) => {
  const clave = req.query.clave;
  const pregunta = req.query.pregunta;
  const respuesta = req.query.respuesta;
  const tiempo = req.query.tiempo;
  clave != 34 ? res.status(200).send('true') : res.status(400).send('false');

});
// tpi.get('/respuesta', (req, res) => {
//   res.status(200).send();
// });
tpi.listen(port, () => {
  console.log(`Servidor Express en ejecución en http://localhost:${port}`);
});
//console.log(await getPreguntas(url));
