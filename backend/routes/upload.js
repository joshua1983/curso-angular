var express = require('express');
var app = express();

var fileUpload = require('express-fileupload');
var fs = require('fs');

var Usuario = require('../models/usuario');
var Medico = require('../models/medico');
var Hospital = require('../models/hospital');

app.use(fileUpload());

app.put('/:tipo/:id', (req, res, next) => {

    var tipo = req.params.tipo;
    var id = req.params.id;

    var tiposColeccionValidos = ['hospitales', 'medicos', 'usuarios'];

    if (tiposColeccionValidos.indexOf(tipo) < 0){
        res.status(400).json({
            ok: false,
            mensaje: 'Destino no valido'
        }); 
    }

    if (!req.files){
        res.status(400).json({
            ok: false,
            mensaje: 'Debe seleccionar una imagen'
        });    
    }

    // obtener nombre del archivo
    var archivo = req.files.imagen;
    var nombreCortado = archivo.name.split('.');
    var extensionArchivo = nombreCortado[ nombreCortado.length -1 ];

    // solo estas extensiones son aceptadas
    var extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];
    if ( extensionesValidas.indexOf(extensionArchivo) < 0 ){
        res.status(400).json({
            ok: false,
            mensaje: 'Archivo no valido'
        });    
    }

    // nombre del archivo personalizado
    var nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extensionArchivo}`;
    
    //mover el archivo
    var path = `./upload/${tipo}/${nombreArchivo}`;
    archivo.mv (path, err => {
        if (err){
            res.status(500).json({
                ok: false,
                mensaje: 'No se pudo mover el archivo'
            }); 
        }

        subirPorTipo(tipo, id, nombreArchivo, res);
    })

    
});


function subirPorTipo(tipo, id, nombreArchivo, res){
    if (tipo === 'usuarios'){
        Usuario.findById(id, (err, usuario) => {

            if (!usuario){
                res.status(400).json({
                    ok: false,
                    mensaje: 'usuario no existe',
                    errors: { message: 'usuario no existe'}
                });
                return;
            }

            var pathViejo = './uploads/usuarios/'+ usuario.img;
            // si existe elimina la imagen anterior
            if (fs.existsSync(pathViejo)){
                fs.unlink(pathViejo);
            }

            usuario.img = nombreArchivo;
            usuario.save( (err, usuarioActualizado) => {
                usuarioActualizado.password = ":)";
                res.status(200).json({
                    ok: true,
                    mensaje: 'imagen actualizada',
                    usuario: usuarioActualizado
                });
            } );

        });
        return;
    }

    if (tipo === 'medicos'){
        Medico.findById(id, (err, medico) => {

            if (!medico){
                res.status(400).json({
                    ok: false,
                    mensaje: 'medico no existe',
                    errors: { message: 'medico no existe'}
                });
                return;
            }

            var pathViejo = './uploads/medicos/'+ medico.img;
            // si existe elimina la imagen anterior
            if (fs.existsSync(pathViejo)){
                fs.unlink(pathViejo);
            }

            medico.img = nombreArchivo;
            medico.save( (err, medicoActualizado) => {
                res.status(200).json({
                    ok: true,
                    mensaje: 'imagen actualizada',
                    usuario: medicoActualizado
                });
            } );

        });
        return;
    }

    if (tipo === 'hospitales'){
        Hospital.findById(id, (err, hospital) => {
            if (!hospital){
                res.status(400).json({
                    ok: false,
                    mensaje: 'hospital no existe',
                    errors: { message: 'hospital no existe'}
                });
                return;
            }

            var pathViejo = './uploads/hospitales/'+ hospital.img;
            // si existe elimina la imagen anterior
            if (fs.existsSync(pathViejo)){
                fs.unlink(pathViejo);
            }

            hospital.img = nombreArchivo;
            hospital.save( (err, hospitalActualizado) => {
                res.status(200).json({
                    ok: true,
                    mensaje: 'imagen actualizada',
                    hospital: hospitalActualizado
                });
            } );

        });
        return;
    }
}

module.exports = app;