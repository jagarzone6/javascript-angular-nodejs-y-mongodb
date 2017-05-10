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
    user.role = 'ROLE_USER';
    user.image = 'null';

    if(params.password){
        //Encriptar y guardar dato


    } else {
        res.status(500).send({message:'Introduce la contraseña'});
    }
}

module.exports = {
  pruebas,
  saveUser
};