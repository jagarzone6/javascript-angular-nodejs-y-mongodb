'use strict'


var express = require('express');
var AlbumController = require('../controllers/album');

var api = express.Router();
var md_auth = require('../middleware/authenticated');

var multipart = require('connect-multiparty');

var md_upload = multipart({ uploadDir: './uploads/albums'});

api.get('/getAlbum/:id',md_auth.ensureAuth,AlbumController.getAlbum );

api.get('/getAlbums/:page?',md_auth.ensureAuth,AlbumController.getAlbums);



module.exports = api;