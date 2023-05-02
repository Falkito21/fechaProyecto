// Caracteres Minimos
const caracteresMinimos = (texto) => {
    try {
        if(texto.length < 8) throw new errorCaracteresMin(501)
        if(texto.lenght > 4) return texto
    } catch (error) {
        throw error
    }
}
// Caracteres Maximos
const caracteresMaximos = (texto) => {
    try {
        if(texto.length > 50) throw new errorCaracteresMax(501)
        return texto
    } catch (error) {
        throw error
    }
}
// Elemento vacio
const elementoVacio = (datos, ubicacion) =>{
    try {
        if(datos === '' || datos === null || datos === undefined || datos === ' ') throw new errorElementoVacio(ubicacion, 501)
        return datos
    } catch (error) {
        throw error
    }
}
// Descripcion con numeros
const numerosEnDescripcion = (texto) => {
    try {
        const NUMEROS = new RegExp("^([^0-9]*)$")
        let noContNum = NUMEROS.test(texto)
        if(!noContNum) throw new errorNumerosEnDescripcion(501)
        if(noContNum) return texto
    } catch (error) {
        throw error
    }
}
// Descripcion con signos 
const descripcionConSignos = (texto) => {
    try {
        const LETRAS_INPUT = /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/;
        //cumple condicion
        let cumple = LETRAS_INPUT.test(texto)
        if(!cumple) throw new errorSignosEnDescripcion(501)
        if(cumple) return texto
    } catch (error) {
        throw error
    }
}
// Fecha mayor a la actual
const fechaActual = (fecha) => {
    try {
        let fechaAct = new Date()
        if(new Date(fecha) <  fechaAct) throw new errorFechaActual(501)
        return fecha
    } catch (error) {
        throw error
    }
}
// Evitar doble espacios
const dobleEspacios = (texto) => {
    try {
        const ESPACIOS_INPUT = /([  ]{2,})/
        let cumpleCond = ESPACIOS_INPUT.test(texto)
        if(cumpleCond) throw new errorDobleEspacios(501)
        if(!cumpleCond) return texto
    } catch (error) {
        throw error
    }
}
