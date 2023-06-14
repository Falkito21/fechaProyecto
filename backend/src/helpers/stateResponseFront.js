export const responseType = (response, infoError) => {
    try {
        if(infoError.responseCode === 501){
            responseFront(response, infoError.responseCode, infoError.message)
        }else{
            responseFront(response, 500, infoError)
        }
    } catch (error) {
        throw error
    }
}
export const responseFront = async (res,responseCode,data) => {
    try {
        switch (responseCode) {
            case 200:
                res.status(responseCode).json({"Status" : responseCode, "Menssage" : data});
            break;
            case 400:
                res.status(responseCode).json({"Status" : responseCode, "Menssage" : data});
            break;
            case 501:
                res.status(responseCode).json({"Status" : responseCode, "Menssage": data});
            break;
            default:
                res.status(500).json({"Status" : responseCode, "Menssage" : "Unexpected Error - " + data});
            break;
        }
    } catch (error) {
        throw error
    }
}