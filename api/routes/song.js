'use strict'


var express = require('express');
var SongController = require('../controllers/song');

var api = express.Router();
var md_auth = require('../middleware/authenticated');

var multipart = require('connect-multiparty');

var md_upload = multipart({ uploadDir: './uploads/songs'});

api.get('/getSong/:id',md_auth.ensureAuth,SongController.getSong );

api.get('/getSongs/:album?',md_auth.ensureAuth,SongController.getSongs);

api.post('/saveSong',md_auth.ensureAuth,SongController.saveSong );

api.put('/updateSong/:id',md_auth.ensureAuth,SongController.updateSong );

api.delete('/deleteSong/:id',md_auth.ensureAuth,SongController.deleteSong );

api.post('/uploadSongFile/:id', [md_auth.ensureAuth,md_upload] ,SongController.uploadSongFile );

api.get('/getSongFile/:songFile', SongController.getSongFile );



module.exports = api;