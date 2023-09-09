import express from 'express';
import compression from 'compression';
import { obtenerPaises } from "./v1/models/obtener_paises.js";
import pg from 'pg';
import cors from 'cors';
import { getPreguntas } from "./v1/controllers/main_src.js";
const url = 'https://restcountries.com/v3.1/all';
const tpi = express();
const port = 8082;
const DEV = true;
var paises = await obtenerPaises(url);
var clientDB = new pg.Client({
  user: 'fl0user',
  host: 'ep-round-mud-58521732.ap-southeast-1.aws.neon.tech',
  database: 'rafalopez',
  password: 'pciTKF9fSq3a',
  port: 5432,
  ssl: { rejectUnauthorized: false },
});
const corsOptions = {
  origin: ['http://127.0.0.1:5503', '*'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
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
  res.send(await getPreguntas(paises));
});

tpi.get(`/paises`, async (req, res) => {
  if (!paises) { await getPreguntas(url) }
  res.send(paises);
});
// ruta  archivo HTML default
tpi.use(compression());
tpi.use(express.static('public'));
tpi.get('/', (req, res) => {
  const inde = "/index.html";
  res.sendFile(inde);
});
tpi.get('/pregunta', (req, res) => {
  const clave = req.query.clave;
  const respuesta = paises[clave];
  res.status(200).send(respuesta);
});
tpi.post('/respuesta', (req, res) => {
  const rpt = req.body;
  console.log(Object.values(paises[rpt.clave]).includes(rpt.respuesta));
  console.log(`Peticion ${rpt.tipo}`);
  console.log(paises[req.body.clave]);
  let resultado = {
    respuesta: Object.values(paises[rpt.clave]).includes(rpt.respuesta),
    pregunta: paises[req.body.clave]
  };
  res.status(200).send(JSON.stringify(resultado));
});
tpi.listen(port, () => {
  console.log(`Servidor Express en ejecución en http://localhost:${port}`);
});
/***** pruebas base datos postgrsql *****/
const consultaPreparada = {
  name: 'seleccionar_usuarios',
  text: 'SELECT * FROM usuarios',
};

async function ejecutarConsultaPreparada() {
  try {
    await clientDB.connect();
    // Ejecutar la consulta preparada
    const resultado = await clientDB.query(consultaPreparada);
    console.log('Filas seleccionadas:', resultado.rows);
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error);
  } finally {
    // Cierra la conexión al finalizar las operaciones
    clientDB.end();
  }
}
ejecutarConsultaPreparada();