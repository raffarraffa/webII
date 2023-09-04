import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const tpi = express();
const port = 8080;
const __ver = 'v1';
console.log(__dirname);
// Define una función para obtener la ruta absoluta al directorio de tu proyecto
/*
const getAbsolutePath = (filePath) => {
  console.log(__dirname);
  return join(__dirname, filePath);
};
*/
// Configura el middleware para manejar la caché
const DEV = true;
if (DEV) {
  tpi.use((req, res, next) => {
    res.header("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    console.log(`Peticion ${req.method} ruta ${req.originalUrl} Sin cache`);
    next();
  });
}

// Configura las rutas

tpi.get(`/${__ver}/`, (req, res) => {
  res.send(`<h1>Trabajo Practico Integrador WEB 2 </h1><h2><em>Deploy realizado ${new Date()} : Método petición ${req.method}  ${req.originalUrl} </em></h2>`);
});

tpi.get(`/${__ver}/todas`, (req, res) => {
  res.send(`<h1>Trabajo Practico Integrador WEB 2 </h1><h2><em>Deploy realizado ${new Date()} : Método petición ${req.method}  ${req.originalUrl} </em></h2>`);
});

// Configura la ruta para servir el archivo HTML
tpi.get('/', (req, res) => {
  //  const indexPath = getAbsolutePath('views/index.html');
  const indexPath = `${__dirname}/views/index.html`;
  res.sendFile(indexPath);
});

// Inicia el servidor
tpi.listen(port, () => {
  console.log(`Servidor Express en ejecución en http://localhost:${port}`);
});
