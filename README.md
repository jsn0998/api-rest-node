API REST completa para crear un blog con el MERN Stack (CRUD de coleccion Articulo)
Para ejecutar el proyecto se debe de ejecutar en consola npm i y se instalaran los paquetes
Nota: Manual Tecnico del proyecto de nodeJs ==> GuiaNodeMovil.docx

Entorno de desarrollo para crear Api Rest con MongoDb
Empaquetador NodeJs
Comandos a usar después de instalar NodeJs
node --version

Librería Express
Express es un framework que se encarga de manejar las peticiones HTTP (GET, POST, UPDATE, DELETE)
npm install express --save Guardar dependencia express dentro de nuestro proyecto, no de manera global

Mongoose
Permite tener una librería de funciones variadas (hacer una búsqueda, guardar un dato entre otros)para trabajar de manera más sencilla con monbgodb dentro de nuestro proyecto con node.js
Intalar una versión de mongoose en concreto versión 6.3, una vez ingresado al proyecto
npm install mongoose --save	conexion a bd mongodb
Después de instalar mongoose es posible usar la sgte línea de comandos en el CMD:
show mongoose versions: Permite ver las versiones de mongoose disponibles.
npm update mongoose: Actualiza mongoose a la version más estable.
npm uninstall mongoose : Elimina un paquete npm de mi proyecto.
npm install mongoose@7.2.0: Instalar versión 7.2.0 de mongoose.

Enlace para validar datos de un modelo a través de mongoose: https://mongoosejs.com/docs/schematypes.html

const {Schema, model} = require("mongoose");

// https://mongoosejs.com/docs/schematypes.html
const ArticuloSchema = Schema(
    {
        titulo: {
            type: String,
            required: true
        },
        contenido: {
            type: String,
            required: true
        },
        fecha: {
            type: Date,
            default: Date.now
        },
        imagen: {
            type: String,
            default: "default.png"
        },
    }
);

module.exports = model("Articulo", ArticuloSchema, "articulos");// la coleccion va hacer articulos


Librería multer
Librería que permite subir archivos
npm install multer --save   :Guardar dependencia multi dentro de nuestro proyecto, no de manera global

Librería validator
Librería que permite validar datos, su enlace es: https://www.npmjs.com/package/validator
npm install validator --save  : Guardar dependencia validator dentro de nuestro proyecto, no de manera global

Librería core
Solución a problemas de cors, es decir a problemas de orígenes y dominios cruzados
npm install cors --save   Guardar dependencia cors dentro de nuestro proyecto, no de manera global

Nodemon
Monitorizar todos los cambios que se hagan a nivel código para actualizar el servidor, evita no tener que cerrar el proyecto y de nuevo arrancar el código.
npm install nodemon --save-dev compila y revisa el código de node, el --save-dev es para que solo se instale en modo desarrollo, no cuando se corra en producción


Crear un proyecto de node.js
1.	Crear carpeta en cualquier carpeta contenedora
2.	Ejecutar comando: npm init
3.	Ingresamos los parámetros necesarios para su creación como el nombre, autor, nombre del archivo index

Comandos a usar después de crear el proyecto node.js (Ubicarse por consola dentro de la carpeta principal del proyecto, se debe de tener creado un archivo index.js)
node index.js :Arranca el servidor. Para no tener que typear node index.js  para arrancar el servidor se puede escribir dentro del archivo package.json la sgte línea: 
"start":"node index.js"
O si se instala la libreria Nodemon se puede escribir
"start":"nodemon index.js"

{
  "name": "api-rest-node",
  "version": "1.0.0",
  "description": "API Rest con NodeJS",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start":"nodemon index.js"
  },
  "author": "Joseph Sanchez",
  "license": "MIT",
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "mongoose": "^7.5.2",
    "multer": "^1.4.5-lts.1",
    "validator": "^13.11.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}

Después se puede escribir el comando npm start para inicializar el servidor.

