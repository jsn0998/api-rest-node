const {Router} = require("express");
const multer = require('multer');
const router = Router(); 

const almacenamiento = multer.diskStorage({
    destination:(req, file, cb)=>{
        // esto se sube a la raiz del proyecto por eso se puso el punto adelante de la ruta
        cb(null, './imagenes/articulos/');
    },
    filename:(req, file, cb)=>{
        cb(null,"articulo"+Date.now()+file.originalname);// cambio de nombre del archivo
    }
});

const subidas = multer({storage: almacenamiento});

const ArticuloControlador = require("../controladores/Articulo");
// Rutas de pruebas
router.get("/ruta-de-prueba",ArticuloControlador.prueba);
router.get("/curso",ArticuloControlador.curso);

// Ruta util
router.post("/crear",ArticuloControlador.crear);
router.get("/articulos/:ultimos?",ArticuloControlador.listar);
router.get("/articulo/:id",ArticuloControlador.uno);
router.delete("/articulo/:id",ArticuloControlador.borrar);
router.put("/articulo/:id",ArticuloControlador.editar);
router.post("/subir-imagen/:id",[subidas.single("file0")],ArticuloControlador.subir);

router.get("/imagen/:fichero",ArticuloControlador.imagen);
router.get("/buscar/:busqueda",ArticuloControlador.buscador);

module.exports = router;


