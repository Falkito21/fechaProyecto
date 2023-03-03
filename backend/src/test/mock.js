import { formatFecha } from "#Helpers/validaciones.js"
export const fechaDefault = {
    FechaDia: "2034-04-09",
    FechaDescripcion: "Primera fecha de testing" 
}
export const fechaSinDia = {
    FechaDia: "",
    FechaDescripcion: "Primera fecha de testing" 
}
export const fechaSinDescripcion = {
    FechaDia: "2024-04-09",
    FechaDescripcion: "" 
}
export const fechaSinData = {
    FechaDia: "",
    FechaDescripcion: "" 
}
export const fechaSinCuerpo = {

}
export const fechaConDescripcionConDobleEspacios = {
    FechaDia : "2024-04-09"
    ,FechaDescripcion : "Primer   a fecha de testing"
}
export const fechaConDescripcionErronea = {
    FechaDia : "2024-04-09"
    ,FechaDescripcion : 21332 
}
export const fechaConDiaErroneo = {
    FechaDia : "lkfdsa"
    , FechaDescripcion : "Primera fecha de testing"
}
export const FechaDescripcionConNumeros = { 
    FechaDia : "2024-04-10"
    ,FechaDescripcion : "jflask231fdds" 
}
export const fechaDescripcionConSignos = {
    FechaDia : "2035-04-10"
    ,FechaDescripcion : "jflask%^&*@fdds" 
}
export const fechaConFechaAntigua = {
    FechaDia:"2020-05-12",
    FechaDescripcion : "Primera fecha de testing"
}

export const fechaRepetida = {
    FechaDia: "2033-04-10",
    FechaDescripcion : "Fecha Repetida"
}
export const fechaOkDistinta = {
    FechaDia: "2035-05-11"
    ,FechaDescripcion:"Fecha diferente pero ok"
}
export const fechaModificarDobleEspacios ={
    FechaID: "2029"
    ,FechaDia: "2035-05-11"
    ,FechaDescripcion: "Fecha m  odificarDobleEspacios"
}
export const fechaModificarSinDia ={
    FechaID: "2029"
    ,FechaDia: ""
    ,FechaDescripcion: "Fecha modificarDobleEspacios"
}
export const fechaModificarSinDesc ={
    FechaID: "2029"
    ,FechaDia: "2035-05-11"
    ,FechaDescripcion: ""
}
export const fechaModificarConDescNum ={
    FechaID: "2029"
    ,FechaDia: "2035-05-11"
    ,FechaDescripcion: "lkjfsda213jkfas"
}
export const fechaModificarIdError ={
    FechaID: "2"
    ,FechaDia: "2035-05-11"
    ,FechaDescripcion: "fsdkfas"
}
export const fechaModificarFechaAnt ={
    FechaID: "2029"
    ,FechaDia: "2020-05-11"
    ,FechaDescripcion: "lkjfsdajkfas"
}
export const fechaAct = formatFecha(new Date().toLocaleString())
