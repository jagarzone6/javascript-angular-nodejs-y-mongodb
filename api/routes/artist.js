'use strict'


var express = require('express');
var ArtistController = require('../controllers/artist');

var api = express.Router();
var md_auth = require('../middleware/authenticated');

var multipart = require('connect-multiparty');

var md_upload = multipart({ uploadDir: './uploads/artists'})

api.get('/getArtist/:id',md_auth.ensureAuth,ArtistController.getArtist );

api.post('/saveArtist',md_auth.ensureAuth,ArtistController.saveArtist );

api.get('/getArtists/:page?',md_auth.ensureAuth,ArtistController.getArtists );

module.exports = api;