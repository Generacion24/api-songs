const { getAll, create, getOne, remove, update, setArtist, setGenres } = require('../controllers/song.controllers');
const express = require('express');

const routerSong = express.Router();

routerSong.route('/')
    .get(getAll)
    .post(create);

routerSong.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

//----> /songs/:id/artists
routerSong.route('/:id/artists')
    .post(setArtist)

routerSong.route('/:id/genres')
    .post(setGenres)

module.exports = routerSong;