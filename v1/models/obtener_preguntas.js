function obtenerPreguntas(data) {
    let keys = obtenerKey(data);
    paisesKeyMesclados(keys);
    let preguntas = [];
    for (let i = 0; i < 10; i++) {
        let pregunta = {

        };
        let respuesta = [];
        let num = Math.floor(Math.random() * 2);
        if (num % 2 == 0) {
            pregunta.clave = keys[i];
            pregunta.tipo = 'capital';
            respuesta.push(data[keys[i]].capital);
            pregunta.pregunta = data[keys[i]].nombre;
            for (let j = i; j < i + 3; j++) {
                respuesta.push(data[keys[j + 10]].capital);
            }
        } else {
            pregunta.clave = keys[i];
            pregunta.tipo = 'bandera';
            respuesta.push(data[keys[i]].nombre);
            pregunta.pregunta = data[keys[i]].bandera;
            for (let j = i; j < i + 3; j++) {
                respuesta.push(data[keys[j + 10]].nombre);
            }

        }
        pregunta.respuesta = respuesta;
        preguntas.push(pregunta);

    }
    return preguntas;
}

function obtenerKey(data) {
    let paisesArrayKey = [];
    for (let i = 0; i < data.length; i++) {
        paisesArrayKey.push(i);
    };
    return paisesArrayKey;
}
function paisesKeyMesclados(keys) {
    // let keyShuffle = [...keys];
    for (let i = keys.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [keys[i], keys[j]] = [keys[j], keys[i]];
    }
    //     return data;
}

function creaPregunta(keys, data) {
    let pregunta = {};
}
export { obtenerPreguntas };