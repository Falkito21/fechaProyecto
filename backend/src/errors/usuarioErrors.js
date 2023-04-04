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