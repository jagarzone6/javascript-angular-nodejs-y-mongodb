'use strict'

var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var mongoosePaginate = require('mongoose-pagination');

var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');

var jwt = require('../services/jwt');

function getAlbum (req,res) {

    var albumId = req.params.id;

    Album.findById(albumId, (err,album) => {
        if(err){
            res.status(500).send({message: 'Error en el request del Album'});
        }  else{
            if(!album){
                res.status(404).send({message: 'No se ha encontrado el Album'});
            } else{
                res.status(200).send({album: album});

            }

        }
    });

}

function getAlbums (req,res) {

    if(req.params.page){
        var page = req.params.page;
    }else{
        var page = 1;
    }

    var itemsPerPage = 5;

    Album.find().sort('title').paginate(page,itemsPerPage,function(err,albums,total){

        if(err){
            res.status(500).send({message: 'Error al cargar los Albums !'});
        }  else{
            if(!albums){
                res.status(404).send({message: 'No hay Albums !'});
            } else{
                res.status(200).send({albums: albums,records: total});


            }

        }

    });




}


function saveAlbum (req,res) {

    var album = new Album();
    var params = req.body;

    //console.log(params);
    album.title = params.title;
    album.description = params.description;
    album.year = params.year;
    album.image = 'null';
    album.artist = params.artist;




    album.save((err,albumStored) => {
        if(err){
            res.status(500).send({message: 'Error al guardar el Album'});
        }  else{
            if(!albumStored){
                res.status(404).send({message: 'No se ha registrado el Album'});
            } else{
                res.status(200).send({Album: albumStored});

            }

        }
    });

}





module.exports = {
    getAlbum,
    getAlbums,
    saveAlbum



};