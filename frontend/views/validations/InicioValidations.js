const emailValidate = async (userEmail) => {
    console.log('emailValidate - inicioValidations - userEmail: ', userEmail)
    const FORMAT_EMAIL = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    let esCorrecto = FORMAT_EMAIL.test(userEmail)
    if(!esCorrecto) throw new emailError(501)
    if(esCorrecto) return userEmail
}
const passwordValidate = async (userPassword) => {
    const FORMAT_PASS = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    let esCorrecto = FORMAT_PASS.test(userPassword)
    if (!esCorrecto) throw new passwordError(501)
    if(esCorrecto) return userPassword
}
