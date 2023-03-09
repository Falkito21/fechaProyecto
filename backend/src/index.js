import app from "#Config/http.js"

export const server = app.listen(process.env.PORT, () => {
    console.log('SERVER ON PORT: ' + process.env.PORT);    
})