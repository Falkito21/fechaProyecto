export class emailEnUso extends Error{
    constructor(num){
        super(num)
        this.codigoRes = num
        this.message = 'El email ya se encuentra en uso.'
    }
}
export class emailIncorrecto extends Error{
    constructor(num){
        super(num)
        this.codigoRes = num
        this.message = 'El email o la contrasenia son incorrectos'
    }
}
export class formatoEmailIncorrecto extends Error {
    constructor(num){
        super(num)
            this.codigoRes = num
            this.message = 'El formato del mail no es el correcto'
    }
}
export class elmentoVacio extends Error{
    constructor(num, elemento) {
        super(num, elemento)
        this.codigoRes = num
        this.message = 'El ' + elemento + ' no puede estar vacio'
    }
}
export class formatoPassIncorrecto extends Error{
    constructor(num){
        super(num)
        this.codigoRes = num
        this.message = 'La contraseña debe contar con los siguientes requisitos: 8 caracteres de longitud.\n Al menos una letra mayúscula\n Al menos una letra minúscula \nAl menos un número \nUn carácter especial'
    }
}
export class crearToken extends Error{
    constructor(num){
        super(num)
        this.codigoRes = num
        this.message = 'Error al crear el token.'
    }
}
export class encriptarPassword extends Error{
    constructor(num){
        super(num)
        this.codigoRes = num
        this.message = 'Error al encriptar la password.'
    }
}
export class generarAccesoAlToken extends Error{
    constructor(num){
        super(num)
        this.codigoRes = num
        this.message = 'Error al generar el acceso al token.'
    }
}
export class validarToken extends Error{
    constructor(num){
        super(num)
        this.codigoRes = num
        this.message = 'Error al validar el token.'
    }
}