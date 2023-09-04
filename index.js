import express from 'express';
// permite leer el directorio de trabajo
import { dirname } from 'path';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
console.log(`__filename: ${__filename}`);
const __dirname = dirname(__filename);
const tpi = express();
const port = 8080;
const __ver = 'v1';
const DEV = true;
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
  res.send(`<h1>Trabajo Practico Integrador WEB 2 </h1><h2><em>Deploy realizado ${new Date()} : Método petición ${req.method}  ${req.originalUrl} </em></h2>`);
});

tpi.get(`/${__ver}/todas`, (req, res) => {
  res.send(`<h1>Trabajo Practico Integrador WEB 2 </h1><h2><em>Deploy realizado ${new Date()} : Método petición ${req.method}  ${req.originalUrl} </em></h2>`);
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
