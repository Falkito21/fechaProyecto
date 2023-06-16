export const responseType = (response, infoError) => {
    try {
        if(infoError.statusCode === 501){
            responseFront(response, infoError.statusCode, infoError.message)
        }else{
            responseFront(response, 500, infoError)
        }
    } catch (error) {
        throw error
    }
}
export const responseFront = async (res,statusCode,data) => {
    try {
        switch (statusCode) {
            case 200:
                res.status(statusCode).json({"Status" : statusCode, "Menssage" : data});
            break;
            case 400:
                res.status(statusCode).json({"Status" : statusCode, "Menssage" : data});
            break;
            case 501:
                res.status(statusCode).json({"Status" : statusCode, "Menssage": data});
            break;
            default:
                res.status(500).json({"Status" : statusCode, "Menssage" : "Unexpected Error - " + data});
            break;
        }
    } catch (error) {
        throw error
    }
}