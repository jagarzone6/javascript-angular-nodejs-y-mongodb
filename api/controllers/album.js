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

                res.status(200).send({album: albumUpdated});

            }

        }
    });


}

function deleteAlbum (req,res) {

    var albumId = req.params.id;

    Album.findByIdAndRemove(albumId,(err,albumDeleted) => {
        if(err){

            res.status(500).send({message: 'Error al borrar el Album'});

        }else{
            if(!albumDeleted){

                res.status(404).send({message: 'No se ha podido borrar el Album'});

            }else {

               Song.find({album: albumDeleted._id}).remove((err, songRemoved)=> {

                                if (err) {

                                    res.status(500).send({message: 'Error al borrar la cancion del Album del Artista'});

                                } else {
                                    if (!songRemoved) {

                                        res.status(404).send({message: 'No se ha podido borrar la cancion del Album'});

                                    } else {
                                        //success action

                                        res.status(200).send({albumDeleted: albumDeleted});

                                    }
                                }

                            });







            }

        }
    });

}


function uploadImage(req,res){
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

function getImageFile(req,res){

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
    getAlbum,
    getAlbums,
    saveAlbum,
    updateAlbum,
    deleteAlbum,
    uploadImage,
    getImageFile



};