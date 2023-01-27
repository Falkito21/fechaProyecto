// export const responderFront = async(res,Datos) => {
//     try{
        
//         res.json({Datos})
//     }catch(err){
//         console.log("Error en responderALFront: ", err);
//     }

// }

export const validaDatos = async (datos,datosObligatorios) => {
    for (let i = 0; i < datosObligatorios.length; i++) {
        if (!datos[datosObligatorios[i]]) throw new Error ("No se encontraron elementos al validar los datos : " + datosObligatorios[i])
        if(datos[datosObligatorios[i]] === null) throw new Error ("No se encontraron elementos al validar al validar los datos : " + datosObligatorios[i])
    }
}
export const responderFront = async (res,codigoDeRespuesta,datos) => {
    try {
        switch (codigoDeRespuesta) {
            case 200:
                res.status(codigoDeRespuesta).json({ "mensaje" : "Proceso OK" , "data" : datos});
                break;
            case 400:
                res.status(codigoDeRespuesta).json({ "mensaje" : "Proceso NO HAY RUTA" , "data" : datos});
                break;
            case 401: 
                res.status(codigoDeRespuesta).json({"mensaje" : "Proceso Mala peticion"})
                break;
            case 403:
                res.status(codigoDeRespuesta).json({"mensaje" : "Proceso Acceso al recurso prohibido"})
                break;
            case 404: 
                res.status(codigoDeRespuesta).json({"mensaje" : "Proceso No se encontro el recurso solicitado"})
                break;
            case 407:
                res.status(codigoDeRespuesta).json({"mensaje" : "Proceso Se requiere autenticacion de proxy"})
                break;
            case 409: 
                res.status(codigoDeRespuesta).json({"mensaje" : "Proceso Conflicto"})
            case 500:
                res.status(codigoDeRespuesta).json({ "mensaje" : "Proceso ERROR en el servidor" , "error" : datos});
                break;
            case 503:
                res.status(codigoDeRespuesta).json({"mensaje" : "Proceso Servidor no disponible"})
                break;
            case 521: 
                res.status(codigoDeRespuesta).json({"mensaje" : "Proceso Servicio web caido"})
            default:
                res.status(500).json({ "mensaje" : "ERROR INESPERADO"});
                break;
        }
    } catch (error) {
        console.log(error)
    }
}
