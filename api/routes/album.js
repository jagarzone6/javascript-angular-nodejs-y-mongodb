'use strict'


var express = require('express');
var AlbumController = require('../controllers/album');

var api = express.Router();
var md_auth = require('../middleware/authenticated');

var multipart = require('connect-multiparty');

var md_upload = multipart({ uploadDir: './uploads/albums'});

api.get('/getAlbum/:id',md_auth.ensureAuth,AlbumController.getAlbum );

api.get('/getAlbums/:artist?',md_auth.ensureAuth,AlbumController.getAlbums);

api.post('/saveAlbum',md_auth.ensureAuth,AlbumController.saveAlbum );



module.exports = api;