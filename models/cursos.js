const mongoose = require('mongoose');
const config = require('../config/database');

//Esquema para usuario
const cursosSchema = mongoose.Schema({
    titulo: {
        type: String,
    },
    descripcion: {
        type: String,
    },
    dificultad: {
        type: String,
    },
    fecha: {
        type: String,
    },
});

//declaracion de coleccion (nombre,esquema,coleccion)
module.exports = mongoose.model('cursos', cursosSchema,);
