'use strict'

var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var mongoosePaginate = require('mongoose-pagination');

var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');

var jwt = require('../services/jwt');

function getArtist (req,res) {

    var artistId = req.params.id;

    Artist.findById(artistId, (err,artist) => {
        if(err){
            res.status(500).send({message: 'Error en el request del Artista'});
        }  else{
            if(!artist){
                res.status(404).send({message: 'No se ha encontrado el Artista'});
            } else{
                res.status(200).send({artist: artist});

            }

        }
    });

}

function getArtists (req,res) {

    if(req.params.page){
        var page = req.params.page;
    }else{
        var page = 1;
    }

    var itemsPerPage = 5;

    Artist.find().sort('name').paginate(page,itemsPerPage,function(err,artists,total){

        if(err){
            res.status(500).send({message: 'Error al cargar los Artistas !'});
        }  else{
            if(!artists){
                res.status(404).send({message: 'No hay Artistas !'});
            } else{
                res.status(200).send({artists: artists,records: total});


            }

        }

    });




}


function saveArtist (req,res) {

    var artist = new Artist();
    var params = req.body;

    //console.log(params);
    artist.name = params.name;
    artist.description = params.description;
    artist.image = 'null';

    artist.save((err,artistStored) => {
        if(err){
            res.status(500).send({message: 'Error al guardar el Artista'});
        }  else{
            if(!artistStored){
                res.status(404).send({message: 'No se ha registrado el Artista'});
            } else{
                res.status(200).send({artist: artistStored});

            }

        }
    });

}


function updateArtist (req,res) {

    var artistId = req.params.id;
    var update = req.body;

    Artist.findByIdAndUpdate(artistId,update,(err,artistUpdated) => {
        if(err){

            res.status(500).send({message: 'Error al actualizar el Artista'});

        }else{
            if(!artistUpdated){

                res.status(404).send({message: 'No se ha podido actualizar el Artista'});

            }else {

                res.status(200).send({artist: artistUpdated});

            }

        }
    });


}



module.exports = {
    getArtist,
    saveArtist,
    getArtists,
    updateArtist


};