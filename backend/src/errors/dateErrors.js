export class emptyElementError extends Error {
    constructor(type, num) {
        super(type)
        this.statusCode = num
        this.message = 'The value of ' + type + ' is incorrect or is empty.'
    }
}
export class typeError extends Error {
    constructor(elemento, type, num){
        super(num)                        
        this.statusCode = num
        this.message = elemento+' is not of ' + type + ' type.'
    }
}
export class duplicateError extends Error {
    constructor(fecha, num){
        super(num)
        this.statusCode = num
        this.message = 'The date: ' + fecha + ' already exists.'
    }
}
export class signsError extends Error{
    constructor(num){
        super(num)
        this.statusCode = num
        this.message = 'The description can not containt symbols($%^&&)'
    } 
}
export class oldDateError extends Error {
    constructor(fecha, num){
        super(fecha, num)
        this.statusCode = num
        this.message = 'The date can not be less or equal to ' + fecha +'.'
    }
}
export class bodyError extends Error{
    constructor(num){
        super(num)       
        this.statusCode = num
        this.message = 'The body is not receiving information.'
    }
}
export class numInTextError extends Error{
    constructor(num){
        super(num)
        this.statusCode = num
        this.message = 'The description text must not contain numbers.' 
    }
}
export class idError extends Error{
    constructor(id ,num){
        super(id,num)
        this.statusCode = num
        this.message = 'The id: '+ id + ' doesnt exist.'
    }
}
export class idTypeError extends Error{
    constructor(id ,num){
        super(id,num)
        this.statusCode = num
        this.message = 'The id is not type number or is empty.'
    }
}
export class spacesError extends Error{
    constructor(num){
        super(num)
        this.statusCode = num
        this.message = 'Only blank spaces are not allowed.'
    } 
}
export class controllerError extends Error{
    constructor(lugar, num){
        super(num)
        this.statusCode = num
        this.message = 'Error in: ' + lugar + '.'
    }
}
export class doubleSpacesError extends Error{
    constructor(num){
        super(num)
        this.statusCode = num
        this.message = 'Two or more consecutive blank spaces are not allowed.'
    }
}
export class formatDateError extends Error{
    constructor(num){
        super(num)
        this.statusCode = num
        this.message = 'Error while formatting the date.'
    }
}
export class compareDatesError extends Error{
    constructor(num){
        super(num)
        this.statusCode = num
        this.message = 'Error while comparing dates.'
    }
}
