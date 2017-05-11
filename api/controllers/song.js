'use strict'

var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var mongoosePaginate = require('mongoose-pagination');

var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');

var jwt = require('../services/jwt');

function getSong (req,res) {

    var songId = req.params.id;

    Song.findById(songId).populate({path: 'album'}).exec( (err,song) => {
        if(err){
            res.status(500).send({message: 'Error en el request de la cancion'});
        }  else{
            if(!song){
                res.status(404).send({message: 'No se ha encontrado la cancion'});
            } else{
                res.status(200).send({song: song});

            }

        }
    });

}

function getSongs (req,res) {

    var albumId = req.params.album;
    if(req.params.page){
        var page = req.params.page;
    }else{
        var page = 1;
    }

    var itemsPerPage = 5;

    if(!albumId){

        var find = Song.find().sort('name');
        find.populate({path: 'album',
        populate: {
            path: 'artist',
            model: 'Artist'
        }

        }).exec( (err, songs)=> {
            if (err) {
                res.status(500).send({message: 'Error al cargar las canciones !'});
            } else {
                if (!songs) {
                    res.status(404).send({message: 'No hay canciones !'});
                } else {
                    res.status(200).send({songs: songs});


                }

            }

        });

    }else {

        var find = Song.find({album: albumId}).sort('number');
        find.populate({path: 'album',
            populate: {
                path: 'artist',
                model: 'Artist'
            }

        }).exec( (err, songs)=> {

            if (err) {
                res.status(500).send({message: 'Error al cargar las canciones !'});
            } else {
                if (!songs) {
                    res.status(404).send({message: 'No hay canciones !'});
                } else {
                    res.status(200).send({songs: songs});


                }

            }

        });

    }


}


function saveSong (req,res) {

    var song = new Song();
    var params = req.body;

    //console.log(params);
    song.name = params.name;
    song.number = params.number;
    song.duration = params.duration;
    song.file = "null";
    song.album = params.album;




    song.save((err,songStored) => {
        if(err){
            res.status(500).send({message: 'Error al guardar la cancion'});
        }  else{
            if(!songStored){
                res.status(404).send({message: 'No se ha registrado la cancion'});
            } else{
                res.status(200).send({songStored: songStored});

            }

        }
    });

}

function updateSong (req,res) {

    var songId = req.params.id;
    var update = req.body;

    Song.findByIdAndUpdate(songId,update,(err,songUpdated) => {
        if(err){

            res.status(500).send({message: 'Error al actualizar la cancion'});

        }else{
            if(!songUpdated){

                res.status(404).send({message: 'No se ha podido actualizar la cancion'});

            }else {

                res.status(200).send({song: songUpdated});

            }

        }
    });


}

function deleteSong(req,res) {

    var songId = req.params.id;

    Song.findByIdAndRemove(songId,(err,songDeleted) => {
        if(err){

            res.status(500).send({message: 'Error al borrar la cancion'});

        }else{
            if(!songDeleted){

                res.status(404).send({message: 'No se ha podido borrar la cancion'});

            }else {
                res.status(200).send({songDeleted: songDeleted});


            }

        }
    });

}


function uploadSongFile(req,res){
    var albumId = req.params.id;
    var file_name = 'No ha subido ...';

    if(req.files){

        var file_path = req.files.image.path;

        var file_split = file_path.split("\/");

        var file_name = file_split[2];

        var ext_split = file_name.split('\.');

        var file_ext = ext_split[1];

        //console.log(ext_split);

        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif'){


            Album.findByIdAndUpdate(albumId,{image: file_name},(err,albumUpdated) =>{

                if(!albumUpdated){

                    res.status(404).send({message: 'No se ha podido actualizar el Album'});

                }else {

                    res.status(200).send({album: albumUpdated});

                }

            });
        }else{
            res.status(500).send({message: 'Extension del archivo no soportada'});

        }
    }else{
        res.status(500).send({message: 'No se ha subido una imagen'});
    }
}

function getSongFile(req,res){

    var imageFile = req.params.imageFile;
    var path_file = './uploads/albums/'+imageFile;
    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else {
            res.status(404).send({message: 'No existe la imagen'});
        }
    });
}





module.exports = {
    getSong,
    getSongs,
    saveSong,
    updateSong,
    deleteSong,
    uploadSongFile,
    getSongFile



};