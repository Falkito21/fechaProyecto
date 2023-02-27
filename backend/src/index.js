import app from "#Config/http.js"

export const server = app.listen(process.env.PORT, () => {
    console.log('server on port ', process.env.PORT);
})