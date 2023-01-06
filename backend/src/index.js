import app from "#Config/http.js"


console.log(process.env.PORT)

app.listen(process.env.PORT)
console.log('server on port ', process.env.PORT);