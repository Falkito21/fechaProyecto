export const crearUsuario = (email, pass) => {
    try {
        let query = ""
        query += "INSERT INTO Usuarios"
        query += "("
        query += " email, "
        query += "password"
        query += ")"
        query += "VALUES "
        query += "("
        query += "'" + email + "', "
        query += "'" + pass + "'"
        query += ");"
        return query
    } catch (error) {
        throw error
    }
}

export const verificarEmail = (email) => {
    try {
        let query = ""
        query += "SELECT email FROM Usuarios "
        query += "WHERE email = "
        query += "'" + email + "';"
        return query
    } catch (error) {
        throw error
    }
}

export const getUsuario = (email, pass) => {
    try {
        let query = ""
        query += "select FROM Usuarios WHERE email = "
        query += "'" + email +"' AND password = " 
        query += "'" + pass + "';"
        return query
    } catch (error) {
        throw error
    }
}
export const getId = (email, pass) => {
    try {
        let query = ""
        query += "SELECT id from Usuarios WHERE email = "
        query += "'" + email +"';"
        return query
    } catch (error) {
        throw error
    }
}
export const getUsuarios = () => {
    try {
        let query = ""
        query += 'SELECT gmail, pass from Usuarios'
        return query
    } catch (error) {
        throw error
    }
}