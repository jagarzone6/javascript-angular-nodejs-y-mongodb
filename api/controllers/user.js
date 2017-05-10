'use strict'
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');


function pruebas (req,res) {
    res.status(200).send({
        message: 'Probando el controlador de usuario'
    })

}

function saveUser (req,res) {
    var user = new User();

    var params = req.body;

    console.log(params);
    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_ADMIN';
    user.image = 'null';

    if(params.password){
        //Encriptar y guardar dato
        bcrypt.hash(params.password,null,null,function (err,hash) {
           user.password = hash;
           if(user.name != null && user.name != null && user.name != null){
               //Guardar el usuario
               user.save((err,userStored) => {
                 if(err){
                     res.status(500).send({message: 'Error al guardar el usuario'});
                 }  else{
                     if(!userStored){
                         res.status(404).send({message: 'No se ha registrado el usuario'});
                     } else{
                         res.status(200).send({user: userStored});

                       }

                   }
               });

           }else{
               //
               res.status(200).send({message: 'Introduce todos los campos obligatorios'});
           }
        });


    } else {
        res.status(500).send({message:'Introduce la contraseña'});
    }
}


function loginUser(req,res){

    var params = req.body;

    var email = params.email;
    var password = params.password;

    User.findOne({email: email.toLowerCase()}, (err,user) => {
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else {
            if(!user){
        res.status(404).send({message: 'El usuario no existe'});
    }else{
        bcrypt.compare(password,user.password,function(err,check){
            if(check){
                //devolver los datos del usuario loggeado
                if(params.gethash){
                    //token de jwt


                }else{
                    res.status(200).send({user});
                }

            }else{
                res.status(404).send({message: 'El usuario ha podido loggearse'});
            }
        });
    }



        }
    });

}

module.exports = {
  pruebas,
  saveUser,
  loginUser

};