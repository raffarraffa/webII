import { obtenerPaises } from "../models/obtener_paises.js";
import { obtenerPreguntas } from "../models/obtener_preguntas.js";
let paises;
async function getPreguntas(url) {
    try {
        if (!paises) {
            paises = await obtenerPaises(url);
        }
        const preguntas = await obtenerPreguntas(paises);
        return preguntas;
    } catch (error) {
        console.error('Error:', error);
    }
}
export { getPreguntas };
//TODO usa modleos para intercomnucacion, reglas negocio distiotons modelos
//TODO  recibe del suaurio la pregiunta y la respeusta,  deberia responder , llamando al metodo si true o false, (TIEMPOS, PUNTAJE. etc)
// TODO 
