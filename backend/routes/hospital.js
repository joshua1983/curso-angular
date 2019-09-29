var express = require('express');
var app = express();
var bcrypt = require('bcryptjs');

var mdAutenticacion = require('../middlewares/autenticacion');
var Hospital = require('../models/hospital');


// ============================
// Obtener todos los hospitales
// ============================

app.get('/', (req, res, next) => {

    Hospital.find({}, 'nombre img').exec( 
        (err, hospitales) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando hospitales',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                hospitales: hospitales
            });
    });
});

// ============================
// Crear nuevo hospital
// ============================

app.post('/', mdAutenticacion.verificaToken , (req, res) => {
    var body = req.body;

    var hospital = new Hospital({
        nombre: body.nombre,
        img: body.img
    });

    hospital.save( (err, hospitalGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear hospital',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            hospital: hospitalGuardado
        });

    } );
});


// ============================
// Actualizar hospital
// ============================

app.put('/:id', mdAutenticacion.verificaToken , (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Hospital.findById(id, (err, hospitalEncontrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar el hospital',
                errors: err
            });
        }

        if (!hospitalEncontrado){
            return res.status(400).json({
                ok: false,
                mensaje: 'el hospital no existe',
                errors: { message: 'no existe el hospital'}
            });
        }

        hospitalEncontrado.nombre = body.nombre;
        hospitalEncontrado.img = body.img;

        hospitalEncontrado.save( (err, hospitalGuardado) => {
            if (err){
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar el hospital',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                hospital: hospitalGuardado
            });
        } );

    });

});


// ============================
// Eliminar hospital
// ============================

app.delete('/:id', mdAutenticacion.verificaToken , (req, res, next) => {

    var id = req.params.id;

    Hospital.findByIdAndRemove(id, (err, hospitalBorrado) => { 
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error borrando hospital',
                    errors: err
                });
            }
            if (!hospitalBorrado) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error borrando hospital no existe',
                    errors: {message: "El hospital no existe"}
                });
            }
            res.status(200).json({
                ok: true,
                hospital: hospitalBorrado
            });
    });
});

module.exports = app;