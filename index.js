import express from "express";
const app = express();
const currentDateUTC = new Date();
const currentDate = currentDateUTC.toUTCString();
// la fecha y hora actual en UTC-3
const fechaHoraActualUTC = new Date();
// Ajusta la fecha y hora al huso horario UTC-3
fechaHoraActualUTC.setUTCHours(fechaHoraActualUTC.getUTCHours() - 3);
//console.log(fechaHoraActualUTC);


const port = 8080;
// ste header no cache

app.use((req, res, next) => {
  res.header("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  console.log(`peticion ${req.method} ruta ${req.originalUrl} Sin cache`);
  next();
});
app.use((req, res, next) => {
  res.header("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  next();
});

app.get("/", (req, res) => {
  res.send(`<h1>Trabajo Practico Integrador WEB 2 </h1><h2><em>Deploy realizado  ${currentDate} ( ${fechaHoraActualUTC}) : Método petición ${req.method}  ${req.originalUrl} </em></h2>`);
});

app.use((req, res) => {
  res.status(404).send("<h1>Página no encontrada</h1>");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
