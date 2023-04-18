// Caracteres Minimos
const caracteresMinimos = (texto) => {
    if(texto.length < 8) throw new errorCaracteresMin(501)
    if(texto.lenght > 4) return texto
}
// Caracteres Maximos
const caracteresMaximos = (texto) => {
    if(texto.length > 50) throw new errorCaracteresMax(501)
    return texto
}
// Elemento vacio
const elementoVacio = (datos, ubicacion) =>{
    if(datos === '' || datos === null || datos === undefined || datos === ' ') throw new errorElementoVacio(ubicacion, 501)
    return datos
}
// Descripcion con numeros
const numerosEnDescripcion = (texto) => {
    const NUMEROS = new RegExp("^([^0-9]*)$")
    let noContNum = NUMEROS.test(texto)
    if(!noContNum) throw new errorNumerosEnDescripcion(501)
    if(noContNum) return texto
}
// Descripcion con signos 
const descripcionConSignos = (texto) => {
    const LETRAS_INPUT = /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/;
    //cumple condicion
    let cumple = LETRAS_INPUT.test(texto)
    if(!cumple) throw new errorSignosEnDescripcion(501)
    if(cumple) return texto
}
// Fecha mayor a la actual
const fechaActual = (fecha) => {
    let fechaAct = new Date()
    if(new Date(fecha) <  fechaAct) throw new errorFechaActual(501)
    return fecha
}
// Evitar doble espacios
const dobleEspacios = (texto) => {
    const ESPACIOS_INPUT = /([  ]{2,})/
    let cumpleCond = ESPACIOS_INPUT.test(texto)
    if(cumpleCond) throw new errorDobleEspacios(501)
    if(!cumpleCond) return texto
}
