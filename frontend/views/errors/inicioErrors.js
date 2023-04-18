class emailError extends Error {
    constructor(num){
        super(num)
        this.codigoRes = num
        this.message = 'El formato del email es incorrecto.'
    }
}
class passwordError extends Error {
    constructor(num){
        super(num)
        this.codigoRes = num
        this.message = 'Usar: mayuscula, minuscula, @$!%*#?&, numero y 8 letras'
    }
}
class incorrecto extends Error{ 
    constructor(num){
        super(num)
        this.codigoRes = num
        this.message = 'El mail o la contrasenia son incorrectos'
    }
}
class enUso extends Error{
    constructor(num){
        super(num)
        this.codigoRes = num
        this.message = 'El mail ya se encuentra en uso' 
    }
}