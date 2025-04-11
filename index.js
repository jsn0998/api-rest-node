const {conexion} = require("./basedatos/conexion");
const express = require("express");
const cors = require("cors");
// https://mongoosejs.com/docs/schematypes.html

// Inicializar la app
console.log("App arrancada");

// Conectar a la base de datos
conexion();

// Crear servidor Node
const app = express();
const puerto = 3900;

// Configurar cors
app.use(cors());

// Convertir el body a objeto javascript
app.use(express.json()); // recibir datos con content-type app/json, en Postman es la seccion Body - opcion raw
app.use(express.urlencoded({extended: true})); // se recibe datos que llegan en form-url encoded

//RUTAS
const rutas_articulo = require("./rutas/Articulo");
// Cargo las rutas de articulo que se carguen a partir de la palabra /api
app.use("/api",rutas_articulo);

// Rutas pruebas hardcodeadas
    // app.get("/probando",(req,res)=>{
    //     console.log("Se ha ejecutado el endpoint probando");
    //     // return res.status(200).send(
    //     //     `
    //     //         <div>
    //     //             <h1>Probando ruta node.js</h1>
    //     //             <p>Creando api rest con node</p>
    //     //             <ul>
    //     //                 <li>Master en REACT</li>
    //     //                 <li>Master en PHP</li>
    //     //             </ul>
    //     //         </div>
    //     //     `
    //     // );

    //     // return res.status(200).send(
    //     //     {
    //     //         curso: "Master en React",
    //     //         autor: "Victor Robles WEB",
    //     //         url:"victorroblesweb.es/master-react"
    //     //     }
    //     // );

    //     return res.status(200).json(
    //         [
    //             {
    //                 curso: "Master en React",
    //                 autor: "Victor Robles WEB",
    //                 url:"victorroblesweb.es/master-react"
    //             },
    //             {
    //                 curso: "Master en React",
    //                 autor: "Victor Robles WEB",
    //                 url:"victorroblesweb.es/master-react"
    //             }
    //         ]
    //     );

    // });

    // app.get("/",(req,res)=>{
    //     console.log("Se ha ejecutado el endpoint probando");
    //     return res.status(200).send(
    //         `
    //             <h1>Probando ruta node.js</h1>
    //         `
    //     );
    // });
// Rutas pruebas hardcodeadas



// Cerrar servidor y escuchar peticiones
app.listen(puerto, ()=>{
    console.log("Servidor corriendo en el puerto: "+puerto)
});
