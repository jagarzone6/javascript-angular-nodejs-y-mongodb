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

    var itemsPerPage = 15;

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

function deleteArtist (req,res) {

    var artistId = req.params.id;

    Artist.findByIdAndRemove(artistId,(err,artistDeleted) => {
        if(err){

            res.status(500).send({message: 'Error al borrar el Artista'});

        }else{
            if(!artistDeleted){

                res.status(404).send({message: 'No se ha podido borrar el Artista'});

            }else {

                Album.find({artist: artistDeleted._id}).remove((err,albumRemoved)=>{

                        if(err){

                            res.status(500).send({message: 'Error al borrar el album del Artista'});

                        }else {
                            if (!albumRemoved) {

                                res.status(404).send({message: 'No se ha podido borrar el album del Artista'});

                            } else {

                                Song.find({album: albumRemoved._id}).remove((err, songRemoved)=> {

                                    if (err) {

                                        res.status(500).send({message: 'Error al borrar la cancion del Album del Artista'});

                                    } else {
                                        if (!songRemoved) {

                                            res.status(404).send({message: 'No se ha podido borrar la cancion del Album del Artista'});

                                        } else {
                                            //success action

                                            res.status(200).send({artistDeleted: artistDeleted});

                                        }
                                    }

                                });

                            }


                        }
                });

            }

        }
    });

}

function uploadImage(req,res){
    var artistID = req.params.id;
    var file_name = 'No ha subido ...';

    if(req.files){

        var file_path = req.files.image.path;

        var file_split = file_path.split("\/");

        var file_name = file_split[2];

        var ext_split = file_name.split('\.');

        var file_ext = ext_split[1];

        //console.log(ext_split);

        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){


            Artist.findByIdAndUpdate(artistID,{image: file_name},(err,artistUpdated) =>{

                if(!artistUpdated){

                    res.status(404).send({message: 'No se ha podido actualizar el Artist'});

                }else {

                    res.status(200).send({artist: artistUpdated});

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
    var path_file = './uploads/artists/'+imageFile;
    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else {
            res.status(404).send({message: 'No existe la imagen'});
        }
    });
}



module.exports = {
    getArtist,
    saveArtist,
    getArtists,
    updateArtist,
    deleteArtist,
    uploadImage,
    getImageFile


};