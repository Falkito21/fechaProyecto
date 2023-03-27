import sql from 'mssql'
import {config} from 'dotenv'

config()

const {DB_USER,DB_PWD,DB_SERVER, DB_DATABASE, DB_USER_TEST,DB_PWD_TEST ,DB_SERVER_TEST, DB_DATABASE_TEST} = process.env;


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
        await conection.connect()
        return conection
    }catch(error){
        console.log('Error de conexion: ', error);
    }
}
export {sql}