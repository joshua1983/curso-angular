var express = require('express');
var app = express();

var Hospital = require('../models/hospital');
var Medico = require('../models/medico');
var Usuario = require('../models/usuario');

// ===============================
// Busqueda por coleccion
// ===============================

app.get('/coleccion/:tabla/:busqueda', (req, res) => {
    var tabla = req.params.tabla;
    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');
    var resultado;

    switch(tabla){
        case "hospital" :
            resultado= buscarHospitales(busqueda, regex);
        break;
        case "medicos":
            resultado= buscarMedicos(busqueda, regex);
        break;
        case "usuario":
            resultado= buscarUsuarios(busqueda, regex);
        break;
        default:
            res.status(400).json({
                ok: false,
                [tabla]: "Error"
            });
        break;
    }
    resultado.then(respuestas => {
        res.status(200).json({
            ok: true,
            [tabla]: respuestas
        });
    });
} )



// ===============================
// Busqueda general
// ===============================

app.get('/todo/:busqueda', (req, res, next) => {

    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');

    Promise.all( [buscarHospitales(busqueda, regex), 
                  buscarMedicos(busqueda, regex),
                  buscarUsuarios(busqueda, regex) ] )
            .then (respuestas => {
                res.status(200).json({
                    ok: true,
                    hospitales: respuestas[0],
                    medicos: respuestas[1],
                    usuarios: respuestas[2]
                });
            });
});


function buscarHospitales(busqueda, regex){
    return new Promise( (resolve, reject) => {
        Hospital.find({ nombre: regex})
                .populate('usuario', 'nombre email')
                .exec((err, hospitales) => {
                        if (err){
                            reject('Error al buscar el hospital');    
                        }else{
                            resolve(hospitales);
                        }
                });
    });
}

function buscarMedicos(busqueda, regex){
    return new Promise( (resolve, reject) => {
        Medico.find({ nombre: regex})
                .populate('usuario', 'nombre email')
                .populate('hospital', 'nombre')
                .exec(
                    (err, medicos) => {
                        if (err){
                            reject('Error al buscar el medicos');    
                        }else{
                            resolve(medicos);
                        }
        });
    });
}

function buscarUsuarios(busqueda, regex){
    return new Promise( (resolve, reject) => {
        Usuario.find({}, 'nombre email rol')
                .or( [ { 'nombre': regex }, { 'email': regex } ])
                .exec ( (err, usuarios)  => {
                    if (err){
                        reject('Error al cargar usuarios')
                    }else{
                        resolve( usuarios );
                    }
                })
    });
}

module.exports = app;