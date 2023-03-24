//! CODIGO DE RESPUESTAS Y SUS MENSAJES
export const responderFront = async (res,codigoDeRespuesta,datos) => {
    try {
        switch (codigoDeRespuesta) {
            case 200:
                res.status(codigoDeRespuesta).json({"Estado" : codigoDeRespuesta, "Mensaje" : datos});
                break;
                case 400:
                    res.status(codigoDeRespuesta).json({"Estado" : codigoDeRespuesta, "Mensaje" : datos});
                    break;
                case 501:
                    res.status(codigoDeRespuesta).json({"Estado" : codigoDeRespuesta, "Mensaje": datos});
                break;
            default:
                res.status(500).json({"Estado" : codigoDeRespuesta, "Mensaje" : "ERROR INESPERADO - " + datos});
                break;
        }
    } catch (err) {
        console.log('Error en responder front: ',err)
    }
}
