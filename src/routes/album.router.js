const { getAll, create, getOne, remove, update } = require('../controllers/album.controllers');
const express = require('express');

const routerAlbum = express.Router();

routerAlbum.route('/')
    .get(getAll)
    .post(create);

routerAlbum.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = routerAlbum;