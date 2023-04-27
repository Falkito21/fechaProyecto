import sql from 'mssql'
import {config} from 'dotenv'

config()
const {DB_USER,DB_USER_DATABASE ,DB_PWD,DB_SERVER, DB_DATABASE, DB_USER_TEST,DB_PWD_TEST ,DB_SERVER_TEST, DB_DATABASE_TEST} = process.env;
export const dbConfig = {
    user: DB_USER
    ,password: DB_PWD
    ,server: DB_SERVER
    ,database: DB_DATABASE 
    ,trustServerCertificate: true
}
/** #### Funcion que realiza la conexion a la base de datos con los valores indicados
 * - Buscando la manera de que realice un begin transaction y commit si todo sale ok 
 * @param {Event}
 */ 
export const getConection = async () => {
    try{
        const conection = new sql.ConnectionPool(dbConfig)
        let listo = await conection.connect()
        return listo
    }catch(error){
        throw error
    }
}
/** #### Funcion que realiza la ejecucion de las querys
 * - utilizando el transaction, begin, commit y rollback
 * @param {Event}
 */ 
export const ejecutarQuery = async (query) => {
    const conexionBDD = await getConection()
    let permisoBDD = new sql.Transaction(conexionBDD)
    try {
        await permisoBDD.begin()
        let result = await conexionBDD.request().query(query)
        await permisoBDD.commit()
        return result
    } catch (error) {
        await permisoBDD.rollback()
        throw error
    } finally {
        conexionBDD.close()
    }
}

export {sql}