export class errorQuerys extends Error{
    constructor(lugar, num){
        super(num)
        this.codigoRes = num
        this.message = 'Error en la query ' + lugar + '.'

    }
}