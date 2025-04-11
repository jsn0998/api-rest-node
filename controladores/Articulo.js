// const controller ={
//     propiedad: ()=>{

//     }
// }
const path = require('path');
const fs = require('fs');
const validator = require("validator");
const Articulo = require("../modelos/Articulo");
const { validarArticulo } = require("../helpers/validar");

const prueba = (req, res)=>{

    return res.status(200).json({
        mensaje:"Soy una accion de prueba en mi controlador de articulos"
    });

}

const curso = (req, res)=>{

    return res.status(200).json(
        [
            {
                curso: "Master en React",
                autor: "Victor Robles WEB",
                url:"victorroblesweb.es/master-react"
            },
            {
                curso: "Master en React",
                autor: "Victor Robles WEB",
                url:"victorroblesweb.es/master-react"
            }
        ]
    );
}

const crear = (req, res) =>{

    // Recoger parametros por post a guardar
    let parametros = req.body;

    // Devolver resultado (prueba para practica)
    // return res.status(200).json(
    //     {
    //         mensaje: "Accion de guardar",
    //         parametros
    //     }
    // );

    // Validar datos
    try {
        validarArticulo(parametros);
    } catch (error) {
        return res.status(400).json(
            {
                status: "error",
                mensaje: "Faltan datos por enviar"
            }
        );
    }

    Articulo.create(parametros).then(response =>{
        res.status(200).send(
            {
                status:"success",
                response,
                message:"Registro creado con exito!",
            }
        );
    }).catch(err=>{
        res.status(500).send(
            {
                status:"error",
                response: err,
            }
        );
    });




    // Crear el objeto a guardar
    // const articulo = new Articulo(parametros);

    // Asignar valores a objeto basado en el modelo (manual o automatico)
    // articulo.titulo = parametros.titulo;

    // Guardar el articulo en la base de datos
    // articulo.save((error, articuloGuardado)=>{
    //     if(error || !articuloGuardado){
    //         return res.status(400).json(
    //             {
    //                 status: "error",
    //                 mensaje: "No se ha guardado el articulo"
    //             }
    //         );
    //     }

    //     // Devolver resultado
    //     return res.status(200).json(
    //         {
    //             status: "success",
    //             articulo: articuloGuardado,
    //             mensaje: "Articulo creado con exito!"
    //         }
    //     );
    // });

}


const listar = (req, res)=>{
    setTimeout(() => {
        let consulta = Articulo.find();

        if(req.params.ultimos){
            consulta.limit(2);// limite de registro permitidos
        }
        
        // ordernar del mas actual al mas antiguo (de manera descendente)
        consulta.sort({fecha: -1}).then(response =>{
            res.status(200).send({
                status:"success",
                params:req.params,
                count:response.length,
                response,
            });
        }).catch(err=>{
            res.status(500).send({
                status:"error",
                response: err,
            });
        });
    }, 5000);
    
}

const uno = (req, res)=>{
    // Recoger un ID por la url
    let id = req.params.id;

    Articulo.findById(id).then(response =>{
        // if(!response.id){
        //     res.status(500).send({
        //         status:"error",
        //         message: "No se ha encontrado el articulo",
        //     });
        // }
        res.status(200).send({status:"success",response});
    }).catch(err=>{
        res.status(500).send(
            {
                status:"error",
                response: err,
            }
        );
    });

}

const borrar = (req, res)=>{
    const { id } = req.params;// desestructuracion
    let articuloId = id;
    Articulo.findOneAndDelete({_id: articuloId}).then(response =>{
        res.status(200).send({status:"success",response});
    }).catch(err=>{
        res.status(500).send({status:"error",
        response: err,});
    });

    // Articulo.findByIdAndDelete(id).then(response =>{
    //     if(response.img) unlinkFile(response.img);
    //     res.status(200).send({response});
    // }).catch(err=>{
    //     res.status(500).send({response: err});
    // });
}

const editar = (req, res)=>{

    // Recoger parametros por PUT
    let parametros = req.body;
    const { id } = req.params;

    try {
        validarArticulo(parametros);
    } catch (error) {
        return res.status(400).json(
            {
                status: "error",
                mensaje: "Faltan datos por enviar"
            }
        );
    }

    Articulo.findOneAndUpdate({_id: id},parametros,{new: true}).then(response =>{ // new: true -> devuelve el objeto tal cual queda despues de actualizar
        res.status(200).send({status:"success",response});
    }).catch(err=>{
        res.status(500).send({status:"error",
        response: err,});
    });

    // Articulo.findByIdAndUpdate(id, payload).then(response =>{
    //     res.status(200).send({response});
    // }).catch(err=>{
    //     if(payload.img) unlinkFile(payload.img);
    //     res.status(500).send({response: err});
    // });

}

const subir =(req, res)=>{

    // Comprueba si se paso un archivo
    if(!req.file || !req.file){
        return res.status(404).json(
            {
                status: "error",
                mensaje: "Peticion invalida",
            }
        );
    }


    // Nombre del archivo 
    let archivo = req.file.originalname;

    // Extension del archivo
    let archivo_split = archivo.split("\.");
    let archivo_extension = archivo_split[1];

    // return res.status(200).json(
    //     {
    //         status: "success",
    //         mensaje: "Enviado",
    //         archivo_split,
    //         fichero: req.file
    //     }
    // );


    // Comprobar extension correcta
    if(archivo_extension !="png" && archivo_extension !="jpg" && archivo_extension !="jpeg" && archivo_extension !="gif"){
        // Borrar archivo y dar respuesta
        fs.unlink(req.file.path, (error)=>{
            return res.status(400).json(
                {
                    status: "error",
                    mensaje: "Imagen invalida",
                }
            );
        });
        
    }else{

        const { id } = req.params;

        // new: true -> devuelve el objeto tal cual queda despues de actualizar
        Articulo.findOneAndUpdate({_id: id},{imagen: req.file.filename},{new: true}).then(response =>{ 
            res.status(200).send({status:"success",response,fichero: req.file});
        }).catch(err=>{
            res.status(500).send({status:"error",
            response: err,});
        });
    }
}

const imagen =(req, res)=>{
    // parametro enviado por url (nombre del fichero)
    let fichero = req.params.fichero;
    // ruta de las imagenes en el servidor (proyecto nodejs)
    let ruta_fisica = "./imagenes/articulos/"+fichero;

    fs.stat(ruta_fisica, (error, existe)=>{
        if(existe){
            // uso de la libreria path
            return res.sendFile(path.resolve(ruta_fisica));
        }else{
            res.status(404).send(
                {
                    status:"error",
                    message: "La imagen no existe",
                }
            );
        }
    });
}

const buscador =(req, res)=>{
    // Sacar el string de busqueda
    let busqueda = req.params.busqueda;
    // Find OR
    Articulo.find(
        {
            // Interpretacion de la busqueda: Si el titulo o el contenido del articulo incluye el texto de busqueda seleccionamelo
            "$or":
            [
                {"titulo":{"$regex":busqueda,"$options":"i"}},
                {"contenido":{"$regex":busqueda,"$options":"i"}}
            ]
        }
    )
    .sort({fecha: -1}) // ordernar del mas actual al mas antiguo (de manera descendente)
    .then(response =>{
        if(!response){
            return res.status(500).send({
                status:"error",
                message: "No se ha encontrado el articulo",
            });
        }
        res.status(200).send({status:"success",response});
    }).catch(err=>{
        res.status(500).send({status:"error",
        message: "No se han encontrado articulos",});
    });


    // Articulo.findOneAndUpdate({_id: id},{imagen: req.file.filename},{new: true}).then(response =>{ // new: true -> devuelve el objeto tal cual queda despues de actualizar
    //     res.status(200).send({status:"success",response,fichero: req.file});
    // }).catch(err=>{
    //     res.status(500).send({status:"error",
    //     response: err,});
    // });

}

module.exports = {
    prueba,
    curso,
    crear,
    listar,
    uno,
    borrar,
    editar,
    subir,
    imagen,
    buscador
}