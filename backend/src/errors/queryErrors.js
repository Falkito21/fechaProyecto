export class queryError extends Error{
    constructor(lugar, num){
        super(num)
        this.codigoRes = num
        this.message = 'Error in the query ' + lugar + '.'

    }
}