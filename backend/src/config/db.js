import sql from 'mssql'
import {config} from 'dotenv'

config()
const {DB_USER, DB_PWD,DB_SERVER, DB_DATABASE, DB_DATABASE_TEST} = process.env;
export const dbConfig = {
    user: DB_USER
    ,password: DB_PWD
    ,server: DB_SERVER
    ,database: DB_DATABASE 
    ,trustServerCertificate: true
}
export const dbConfigTest = {
    user: DB_USER
    ,password: DB_PWD
    ,server: DB_SERVER
    ,database: DB_DATABASE_TEST 
    ,trustServerCertificate: true
}
export const getConection = async () => {
    try{
        console.log('node_env: ', NODE_ENV)
        const conection = null 
        if(NODE_ENV === 'test') conection = new sql.ConnectionPool(dbConfigTest)
        if(NODE_ENV === 'dev') conection = new sql.ConnectionPool(dbConfig)
        let SuccessfullyConection = await conection.connect()
        return SuccessfullyConection
    }catch(error){
        throw error
    }
}
export const executeQuery = async (query) => {
    const connectionBDD = await getConection()
    let permissionBDD = new sql.Transaction(connectionBDD)
    try {
        await permissionBDD.begin()
        let queryListDates = await connectionBDD.request().query(query)
        await permissionBDD.commit()
        return queryListDates
    } catch (error) {
        await permissionBDD.rollback()
        throw error
    } finally {
        connectionBDD.close()
    }
}

export {sql}