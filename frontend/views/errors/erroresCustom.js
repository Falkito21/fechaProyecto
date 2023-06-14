class errorCaracteresMin extends Error {
    constructor(numero){
        super(numero)
        this.codigoRes = numero
        this.message = `La descripcin debe tener al menos 8 caracteres`
    }
}
class errorCaracteresMax extends Error {
    constructor(numero){
        super(numero)
        this.codigoRes = numero
        this.message = `La descripcion no puede contener mas de 50 caracteres`
    }
}
class errorElementoVacio extends Error {
    constructor(ubicacion, numero){
        super(ubicacion, numero)
        this.codigoRes = numero
        this.message = `La ${ubicacion} no puede estar vacio`
    }
}
class errorNumerosEnDescripcion extends Error{
    constructor(numero){
        super(numero)
        this.codigoRes = numero
        this.message = `La descripcion no puede contener numeros`
    }
}
class errorSignosEnDescripcion extends Error{
    constructor(numero){
        super(numero)
        this.codigoRes = numero
        this.message = `La descripcion no puede contener signos (*&^%$#!)`
    }
}
class errorDobleEspacios extends Error{
    constructor(numero){
        super(numero)
        this.codigoRes = numero
        this.message = `La descripcion no puede contener dobles espacios`
    }
}
class errorFechaActual extends Error{
    constructor(numero){
        super(numero)
        this.condigoRes = numero
        this.message = `La fecha ingresada es menor o igual a la actual` 
    }
}
class errorFechaRepetida extends Error{
    constructor(mensaje){
        super(mensaje)
        this.message = mensaje
    }
}