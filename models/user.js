const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//Esquema para usuario
const userSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

//declaracion de coleccion (nombre,esquema,coleccion)
const User = module.exports = mongoose.model('User', userSchema,'users');


module.exports.getUserById = function (id, callback){
    User.findById(id,callback);
}

module.exports.getUserByUsername = function (username, callback){
    const query = {username: username}
    User.findOne(query,callback);
}

//encriptar contraseña y guardar el usuario en la BD
module.exports.addUser = function (newUser, callback){
    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(newUser.password, salt, (err, hash)=>{
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

//compara los password
module.exports.comparePassword = function (passwordForm, passwordBB,callback){
    bcrypt.compare(passwordForm, passwordBB, (err,isMatch)=>{
        if(err) throw err; //si hubo un error
        callback(null, isMatch);
    });
}