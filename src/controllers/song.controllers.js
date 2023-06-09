const catchError = require('../utils/catchError');
const Song = require('../models/Song');
const Artist = require('../models/Artist');
const Genre = require('../models/Genre');

const getAll = catchError(async(req, res) => {
    const results = await Song.findAll({include:[Artist,Genre]});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Song.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Song.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Song.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Song.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

// /songs/:id/artists

const setArtist = catchError(async (req,res)=>{
    const {id} =req.params
    const song = await Song.findByPk(id)
    await song.setArtists(req.body)
    const artist = await song.getArtists()
    return res.json(artist)
})

// /songs/:id/genres

const setGenres = catchError(async (req,res)=>{
    const {id} = req.params
    const song = await Song.findByPk(id)
    await song.setGenres(req.body)
    const genres = await song.getGenres()
    return res.json(genres)
})

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setArtist,
    setGenres
}