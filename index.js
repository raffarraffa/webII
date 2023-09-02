/*
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hola, mundo\n');
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Servidor Node.js ejecutándose en http://localhost:${port}`);
});
*/
const express = require("express");
const app = express();
const currentDate = new Date();
//  console.log(`Solicitud recibida en ${currentDate}: ${req.method} ${req.originalUrl}`);

const port = process.env.PORT ?? 8080;

app.get("/", (req, res) => {
  res.send(`<h1>Trabajo Practico Integrador WEB 2</h1><h2><em>Solicitud recibida en  ${currentDate} :${req.method}  ${req.originalUrl} </em></h2>`);
});

app.use((req, res) => {
  res.status(404).send("<h1>Página no encontrada</h1>");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
