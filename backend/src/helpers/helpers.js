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
                //error de conexion (bdd)
            case 400:
                res.status(codigoDeRespuesta).json({ "mensaje" : "Proceso NO HAY RUTA" , "data" : datos});
                break;
                //errores internos del back
            case 501:
                res.status(codigoDeRespuesta).json({ "mensaje" : "Proceso NO HAY RUTA" , "data" : datos});
                break;
            default:
                res.status(500).json({ "mensaje" : "ERROR INESPERADO" + datos});
                break;
        }
    } catch (err) {
        console.log(err)
    }
}
