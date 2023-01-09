export const getFechas = () => {
    try{
        let query = ""
        query += "SELECT FechaID, FechaDescription, "
        query += "convert(varchar, FechaDia, 103) AS FechaDia"
        query += " FROM "
        query += " Fechas"

        return query
    }catch(err){
        console.log('Error en getFechas de la BDD', err);
    }
}

export const postFechas = (dia, descripcion) => {
    try {
        let query = ""
        query += "insert into Fechas"
        query += " ("
        query += " FechaDia,"
        query += " FechaDescription"
        query += ")"
        query += " VALUES"
        query += " ("
        query += "'" + dia + "', "
        query += "'" + descripcion + "'"
        query += ");"

        return query
    } catch (error) {
        console.log('Error en postFechas de la BDD: ', error)
    }
}

export const deleteFecha = (idFecha) => { 
    try {
        let query = ""
        query += "delete from Fechas"
        query += " where FechaID = "
        query += "'" + idFecha + "'"
        query += ";"

        return query
    } catch (error) {
        console.log('Error en deleteFecha de la DBB: ', error)
    }
}

export const putFecha = (id, dia, descripcion) => {
    try {
        let query = ""
        query += "UPDATE Fechas"
        query += " SET"
        query += " FechaDia = '" + dia + "', "
        query += "FechaDescription = '" + descripcion +  "' "
        query += "WHERE fechaID = " + id + ";"

        return query
    } catch (error) {
        console.error('Error en la putFecha ', error)
    }
}