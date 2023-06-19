export class emailInUseError extends Error{
    constructor(code){
        super(code)
        this.statusCode = code
        this.message = 'The email is already in use.'
    }
}
export class incorrectEmailError extends Error{
    constructor(code){
        super(code)
        this.statusCode = code
        this.message = 'The email or password is incorrects.'
    }
}
export class incorrectEmailFormatError extends Error {
    constructor(code){
        super(code)
            this.statusCode = code
            this.message = 'The email format is incorrect.'
    }
}
export class emptyElementError extends Error{
    constructor(code, element) {
        super(code, element)
        this.statusCode = code
        this.messa1ge = 'The ' + element + ' can not be empty.'
    }
}
export class incorrectPasswordFormatError extends Error{
    constructor(code){
        super(code)
        this.statusCode = code
        this.message = 'The password must meet the following requirements:\n8 characters in length.\nAt least one uppercase letter. \nAt least one lowercase letter. \nAt least one number. \nA special character.'
    }
}
export class createTokenError extends Error{
    constructor(code){
        super(code)
        this.statusCode = code
        this.message = 'Error while creating the token.'
    }
}
export class encryptPasswordError extends Error{
    constructor(code){
        super(code)
        this.statusCode = code
        this.message = 'Error while encrypting the password.'
    }
}
export class generateAccessTokenError extends Error{
    constructor(code){
        super(code)
        this.statusCode = code
        this.message = 'Error while generating token access.'
    }
}
export class tokenValidateError extends Error{
    constructor(code){
        super(code)
        this.statusCode = code
        this.message = 'Error while validating the token.'
    }
}
