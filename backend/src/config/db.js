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

export async function getConection(){
    try{
        const conection = await sql.connect(dbConfig)
        return conection
    }catch(error){
        console.log('Error de conexion: ', error);
        console.log(error)
    }
}
export {sql}