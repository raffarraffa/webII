import { obtenerPaises } from "../models/obtener_paises.js";
import { obtenerPreguntas } from "../models/obtener_preguntas.js";
async function getPreguntas(url) {
    try {
        const paises = await obtenerPaises(url);
        const preguntas = await obtenerPreguntas(paises);
        return preguntas;
    } catch (error) {
        console.error('Error:', error);
    }
}
export { getPreguntas };  
