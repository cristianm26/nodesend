// Subida de archivos
const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');
const Enlaces = require('../models/Enlace')

const subirArchivo = async (req, res, next) => {
    const configuracionMulter = {
        limits: { fileSize: req.usuario ? 1024 * 1024 * 10 : 1024 * 1024 },
        storage: fileStorage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, __dirname + '/../uploads')
            },
            filename: (req, file, cb) => {
                const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
                cb(null, `${shortid.generate()}${extension}`);
            },
            /*  fileFilter: (req, file, cb) => {
                 if (file.mimetype === "application/pdf") {
                     return cb(null, true);
                 }
             } */


        })
    }

    const upload = multer(configuracionMulter).single('archivo');
    upload(req, res, async (error) => {
        if (!error) {
            res.json({ archivo: req.file.filename })
        } else {
            console.log(error);
            return next();
        }
    });
}
const eliminarArchivo = async (req, res) => {
    try {
        fs.unlinkSync(__dirname + `../uploads/${req.archivo}`);
        console.log('Archivo Eliminado')
    } catch (error) {
        console.log(error)
    }
}

const descargar = async (req, res, next) => {

    // Obtiene enlace 
    const { archivo } = req.params;
    const enlace = await Enlaces.findOne({ nombre: archivo })


    const archivoDescarga = __dirname + '/../uploads/' + archivo;
    res.download(archivoDescarga);

    // Eliminar el archivo y la entrada de la base de Datos
    // si las descargar son iguales a 1 - borrar la entrada y borrar el archivo
    const { descargas, nombre } = enlace;
    if (descargas === 1) {
        // Eliminar el archivo
        req.archivo = nombre;
        // eliminar la entrada de la base de datos
        await Enlaces.findOneAndRemove(enlace.id)
        next();

    } else {
        enlace.descargas--;
        await enlace.save();
        // si las descargas son mayores a 1 - Restar 1
    }
}

module.exports = {
    subirArchivo,
    eliminarArchivo,
    descargar
}