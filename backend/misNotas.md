# Inicio 
Creamos un repositorio base para cada proyecto. Tiene previamente cosas instaladas 
-   ### Prettier
        Por una lado tiene configurado *prettier* y por el otro lado un tenemos un *.prettierIgnore* para que no analice el package node_modules ni el package-lock.json
-   ### Eslintrc
        Contiene las configuraciones basicas de estandata para NodeJs
##  Dependencias
- ### Lint-staged
- ### Husky 
        Ejecutaran *Prettier* y *eslint* cada vez que queramos hacer un commit en nuestro repositorio para formatear nuestro codigo de forma previa a subirlo a *git*, de esa manera tendremos un estandar.
Son una serie de hooks para ejecutar *prettier* y *eslint* de manera automatica 
- ### Configuracion
    `"lint-staged": {` <br>
        `"*.js": "eslint --fix",` <br>
        `"*.{js, md}": "prettier --write"`<br>
    -       Le decimos que nos aplique sobre todos los archivos `js` *eslint* y sobre todos los archivos `js` y `ms` *prettier* antes de subirlos a *gitHub*  
Con *husky* introduce esas funciones antes de los commits de *git* creandote una carpeta de configuracion (.husky)
- ### Propiedades
    -       Insertamos una propedidad imports en el *package.json* y creamos un archivo   *jsconfig.json*, nos va a servir para los alias(atajos a la hora de importar archivos)
En vez de tener que utilizar una ruta relativa utilizo una especie de ruta "absoluta" pero que realmente es un alias, el cual lo definimos en el *jsconfig*
    <br>
    `"exclude": ["node_modules],`<br>
        `"module": "Node16",`<br>
        `"baseUrl": "./",`<br>
        `"paths": {`<br>
            `"#Lib/*": ["./src/lib/*]`<br>
        `}`<br>
    `}`<br>