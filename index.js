import express from "express";
const app = express();
const currentDate = new Date();
const port = process.env.PORT ?? 8002;
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
  res.send(`<h1>Trabajo Practico Integrador WEB 2 </h1><h2><em>Deploy realizado  ${currentDate} : Método petición ${req.method}  ${req.originalUrl} </em></h2>`);
});

app.use((req, res) => {
  res.status(404).send("<h1>Página no encontrada</h1>");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
