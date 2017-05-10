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

    Album.findById(albumId).populate({path: 'artist'}).exec( (err,album) => {
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

    var artistId = req.params.artist;
    if(req.params.page){
        var page = req.params.page;
    }else{
        var page = 1;
    }

    var itemsPerPage = 5;

    if(!artistId){

        var find = Album.find().sort('title');
        find.populate({path: 'artist'}).exec( (err, albums)=> {
            if (err) {
                res.status(500).send({message: 'Error al cargar los Albums !'});
            } else {
                if (!albums) {
                    res.status(404).send({message: 'No hay Albums !'});
                } else {
                    res.status(200).send({albums: albums});


                }

            }

        });

    }else {

        var find = Album.find({artist: artistId}).sort('year');
        find.populate({path: 'artist'}).exec( (err, albums)=> {

            if (err) {
                res.status(500).send({message: 'Error al cargar los Albums !'});
            } else {
                if (!albums) {
                    res.status(404).send({message: 'No hay Albums !'});
                } else {
                    res.status(200).send({albums: albums});


                }

            }

        });

    }


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

function updateAlbum (req,res) {

    var albumId = req.params.id;
    var update = req.body;

    Album.findByIdAndUpdate(albumId,update,(err,albumUpdated) => {
        if(err){

            res.status(500).send({message: 'Error al actualizar el Album'});

        }else{
            if(!albumUpdated){

                res.status(404).send({message: 'No se ha podido actualizar el Album'});

            }else {

                res.status(200).send({artist: albumUpdated});

            }

        }
    });


}





module.exports = {
    getAlbum,
    getAlbums,
    saveAlbum,
    updateAlbum



};