import sql from 'mssql'
import {config} from 'dotenv'

config()
const {DB_USER, DB_PWD,DB_SERVER, DB_DATABASE, DB_DATABASE_TEST, NODE_ENV} = process.env;
export const dbConfig = {
    user: DB_USER
    ,password: DB_PWD
    ,server: DB_SERVER
    ,port: 1433
    ,database: DB_DATABASE 
    ,trustServerCertificate: true
}
export const dbConfigTest = {
    user: DB_USER
    ,password: DB_PWD
    ,server: DB_SERVER
    ,port: 1433
    ,database: DB_DATABASE_TEST 
    ,trustServerCertificate: true
}
export const getConection = async () => {
    try{
        let conection = new sql.ConnectionPool(selectTypeConection())
        if(conection === null) throw new Error('problemas para conectar a la bdd')
        let SuccessfullyConection = await conection.connect()
        return SuccessfullyConection
    }catch(error){
        throw error
    }
}
const selectTypeConection = () => {
    if(NODE_ENV === 'test') return dbConfigTest
    return dbConfig
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