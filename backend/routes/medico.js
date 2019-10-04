var express = require('express');
var app = express();

var mdAutenticacion = require('../middlewares/autenticacion');
var Medico = require('../models/medico');


// ============================
// Obtener todos los medicos
// ============================

app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Medico.find({})
        .skip(desde)
        .limit(5)
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img')
        .exec( 
        (err, medicos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando medicos',
                    errors: err
                });
            }
            Medico.count({}, (err, conteo) => {
                res.status(200).json({
                    ok: true,
                    medicos: medicos,
                    total: conteo
                });
            });
    });
});

// ============================
// Crear nuevo medico
// ============================

app.post('/', mdAutenticacion.verificaToken , (req, res) => {
    var body = req.body;

    var medico = new Medico({
        nombre: body.nombre,
        usuario: req.usuario._id,
        hospital: body.hospital
    });

    medico.save( (err, medicoGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear el medico',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            medico: medicoGuardado
        });

    } );
});


// ============================
// Actualizar medico
// ============================

app.put('/:id', mdAutenticacion.verificaToken , (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Medico.findById(id, (err, medicoEncontrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar el medico',
                errors: err
            });
        }

        if (!medicoEncontrado){
            return res.status(400).json({
                ok: false,
                mensaje: 'el medico no existe',
                errors: { message: 'no existe el medico'}
            });
        }

        medicoEncontrado.nombre = body.nombre;
        medicoEncontrado.usuario = req.usuario._id;
        medicoEncontrado.hospital = body.hospital;

        medicoEncontrado.save( (err, medicoGuardado) => {
            if (err){
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar el medico',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                medico: medicoGuardado
            });
        } );

    });

});



// ============================
// Eliminar el medico
// ============================

app.delete('/:id', mdAutenticacion.verificaToken , (req, res, next) => {

    var id = req.params.id;

    Medico.findByIdAndRemove(id, (err, medicoBorrado) => { 
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error borrando medico',
                    errors: err
                });
            }
            if (!medicoBorrado) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error borrando medico no existe',
                    errors: {message: "El medico no existe"}
                });
            }
            res.status(200).json({
                ok: true,
                medico: medicoBorrado
            });
    });
});

module.exports = app;