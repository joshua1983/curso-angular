var express = require('express');
var app = express();
var bcrypt = require('bcryptjs');
var cors = require('cors');

var mdAutenticacion = require('../middlewares/autenticacion');
var Usuario = require('../models/usuario');

// ============================
// Obtener todos los usuarios
// ============================

app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Usuario.find({}, 'nombre email img role google')
        .skip(desde)
        .limit(5)
        .exec( 
        (err, usuarios) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando usuarios',
                    errors: err
                });
            }
            Usuario.count({}, (err, conteo) => {
                res.status(200).json({
                    ok: true,
                    usuarios: usuarios,
                    total: conteo
                });
            })
            
    });
});




// ============================
// Actualizar usuario
// ============================

app.put('/:id', mdAutenticacion.verificaToken , (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Usuario.findById(id, (err, usuarioEncontrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar el usuario',
                errors: err
            });
        }

        if (!usuarioEncontrado){
            return res.status(400).json({
                ok: false,
                mensaje: 'el usuario no existe',
                errors: { message: 'no existe el usuario'}
            });
        }

        usuarioEncontrado.nombre = body.nombre;
        usuarioEncontrado.email = body.email;
        usuarioEncontrado.role = body.role;

        usuarioEncontrado.save( (err, usuarioGuardado) => {
            if (err){
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar el usuario',
                    errors: err
                });
            }
            usuarioGuardado.password = ":)";
            res.status(200).json({
                ok: true,
                usuario: usuarioGuardado
            });
        } );

    });

})

// ============================
// Crear nuevo usuario
// ============================

app.post('/', cors(), (req, res) => {
    var body = req.body;

    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync( body.password, 10),
        img: body.img,
        role: body.role
    });

    usuario.save( (err, usuarioGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear usuario',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            usuario: usuarioGuardado
        });

    } );

    
});

// ============================
// Eliminar usuario
// ============================

app.delete('/:id', mdAutenticacion.verificaToken , (req, res, next) => {

    var id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => { 
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error borrando usuario',
                    errors: err
                });
            }
            if (!usuarioBorrado) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error borrando usuario no existe',
                    errors: {message: "El usuario no existe"}
                });
            }
            res.status(200).json({
                ok: true,
                usuarios: usuarioBorrado
            });
    });
});

module.exports = app;