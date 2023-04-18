//! CODIGO DE RESPUESTAS Y SUS MENSAJES
/** #### Funcion que envia una respuesta al front desde el back en base al codigo de Respuesta con su respectivo mensaje 
 * @param {Event}
 */  
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
    } catch (error) {
        throw error
    }
}