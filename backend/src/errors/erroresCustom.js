export class ErrorElementoVacio extends Error {
    constructor(tipo, num) {
        super(tipo, num)
        this.codigoRes = num
        this.message = 'El valor de ' + tipo + ' es incorrecto o esta vacio.'
    }
}
export class ErrorTipo extends Error {
    constructor(elemento, tipo, num){
        super(num)                        
        this.codigoRes = num
        this.message = elemento+' no es de tipo ' + tipo + '.'
    }
}
export class ErrorDuplicado extends Error {
    constructor(fecha, num){
        super(num)
        this.codigoRes = num
        this.message = 'La fecha: ' + fecha + ' YA existe.'
    }
}
export class ErrorSignos extends Error{
    constructor(num){
        super(num)
        this.codigoRes = num
        this.message = 'La descripcion no puede contener signos($%^&&)'
    } 
}
export class ErrorFechaAntigua extends Error {
    constructor(fecha, num){
        super(fecha, num)
        this.codigoRes = num
        this.message = 'La fecha no puede ser menor o igual a ' + fecha
    }
}
export class ErrorBody extends Error{
    constructor(num){
        super(num)       
        this.codigoRes = num
        this.message = 'El BODY no esta recibiendo informacion'
    }
}
export class ErrorNumeroEnString extends Error{
    constructor(num){
        super(num)
        this.codigoRes = num
        this.message = 'El texto de la descripcion no debe contener numeros'
    }
}
export class ErrorId extends Error{
    constructor(id ,num){
        super(id,num)
        this.codigoRes = num
        this.message = 'El id: '+ id + ' no existe.'
    }
}
export class ErrorEspacios extends Error{
    constructor(num){
        super(num)
        this.codigoRes = num
        this.message = 'No se permite solo espacios en blanco'
    } 
}
export class ErrorController extends Error{
    constructor(lugar, num){
        super(num)
        this.codigoRes = num
        this.message = 'Error en: ' + lugar
    }
}
export class ErrorDobleEspacios extends Error{
    constructor(num){
        super(num)
        this.codigoRes = num
        this.message = 'No se permiten dos o mas espacios en blanco juntos'
    }
}
export class ErrorQuerys extends Error{
    constructor(lugar){
        super(lugar)
        this.message = 'La query ' + lugar + ' tiene problema con los datos que resive o la misma consulta'
    }
}