const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

//modelo donde se encuentran las funciones del usuario
const User = require('../models/user');


//register
router.post('/register',(req,res,next)=>{
    let newUser = User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    User.addUser(newUser, (err, user)=>{
        if(err){
            res.json({success: false, msg: 'failed to register user'});//usuario NO creado
        }
        else{
            res.json({success: true, msg: 'user register'});//usuario creado con exito
        }
    }); 

});


//authenticate
router.post('/authenticate',(req,res,next)=>{
    //recupera los datos desde el FrontEnd
    const username = req.body.username;
    const password = req.body.password;

    //busca en la Bd
    User.getUserByUsername(username, (err, user)=>{
            if(err) throw err; //si hubo un error
            if (!user) return res.json({success:false,msg: "usuario o contraseña incorrectos"});//si el usuario no existe

            User.comparePassword(password, user.password, (err, isMatch)=>{//compara los password (formulario y BD)
                if(err) throw err;
                if(isMatch){// si es correcto
                    //crea un token de session
                    const token = jwt.sign({data:user}, config.secret, {
                        expiresIn: 604800 //1 semana
                    }); 
                    res.json({//Json que devuelve 
                        success:true, 
                        token: 'Bearer '+token,//crea un token "bearer"
                        user: {
                            id: user._id,
                            name: user.name,
                            username: user.username, 
                            email: user.email, 
                       }
                    });
                }
                else{
                    return res.json({data:{success:false,msg: "usuario o contraseña incorrectos"}});//contraseña incorrecta
                }
            })
    })


});
//profile
//passport.authenticate('jwt', {session:false}) protege la ruta si no existe un Token
router.get('/profile', passport.authenticate('jwt', {session:false}) ,(req,res,next)=>{
    res.json({user: req.user});
});



module.exports = router;