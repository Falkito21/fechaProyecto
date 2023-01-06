export const responderFront = async(res,Datos) => {
    try{
        res.json({Datos})
    }catch(err){
        console.log("Error en responderALFront: ", err);
    }

}
