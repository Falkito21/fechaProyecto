//! CODIGO DE RESPUESTAS Y SUS MENSAJES
export const responderFront = async (res,codigoDeRespuesta,datos) => {
    try {
        switch (codigoDeRespuesta) {
            case 200:
                res.status(codigoDeRespuesta).json({ "mensaje" : "Proceso OK" , "data" : datos});
                break;
            case 400:
                res.status(codigoDeRespuesta).json({ "mensaje" : "Proceso NO HAY RUTA" , "data" : datos});
                break;
            case 501:
                res.status(codigoDeRespuesta).json({ "Mensaje" : "ERROR CAPTURADO" , "data" : datos});
                break;
            default:
                res.status(500).json({ "mensaje" : "ERROR INESPERADO " + datos});
                break;
        }
    } catch (err) {
        console.log(err)
    }
}
