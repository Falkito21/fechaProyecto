import app from "#Config/http.js"

app.listen(process.env.PORT)
console.log('server on port ', process.env.PORT);