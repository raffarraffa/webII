function pre(datas) {
  console.log(datas);
  let data = [...datas];
  for (let i = 0; i < 10; i++) {
    console.log(paises[data.pop()]);
  }
}
import express from 'express';
// permite leer el directorio de trabajo
import { dirname } from 'path';
import { fileURLToPath } from 'url';
// importo el modelo paises y preguntas
import { obtenerPaises, obtenerPaisesKey, paisesKeyMesclados } from './v1/models/get_paises.js';

//import { obtenerPreguntas } from './models/get_preguntas.js';

const __filename = fileURLToPath(import.meta.url);
const urlRestCountry = "https://restcountries.com/v3.1/all";
const __dirname = dirname(__filename);
const tpi = express();
const port = 8081;
const __ver = 'v1';
const DEV = true;
const paises = await obtenerPaises(urlRestCountry);
const paisesKey = await obtenerPaisesKey(paises);
const paisesMesclados = await paisesKeyMesclados(paisesKey);

console.log(paisesKey.length);
pre(paisesMesclados);
console.log(paisesKey.length);
// Configura el middleware para manejar la caché
if (DEV) {
  tpi.use((req, res, next) => {
    res.header("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    console.log(`Peticion ${req.method} ruta ${req.originalUrl} Sin cache`);
    next();
  });
}
// rutas
tpi.get(`/${__ver}/`, (req, res) => {
  res.send(`<h1>Trabajo Practico Integrador WEB 2 </h1><h2><em>respuesta  realizada ${new Date()} : Método petición ${req.method}  ${req.originalUrl} </em></h2>`);
});

tpi.get(`/${__ver}/preguntas`, (req, res) => {
  //  res.send(`<h1>Trabajo Practico Integrador WEB 2 </h1><h2><em>respuesta realizada ${new Date()} : Método petición ${req.method}  ${req.originalUrl} </em></h2>`);
  res.send(paises);
});

// ruta  archivo HTML default
tpi.get('/', (req, res) => {
  const indexPath = `${__dirname}/views/index.html`;
  res.sendFile(indexPath);
});

// inicia servidor
tpi.listen(port, () => {
  console.log(`Servidor Express en ejecución en http://localhost:${port}`);
});
