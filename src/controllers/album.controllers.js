const catchError = require('../utils/catchError');
const Album = require('../models/Album');
const Artist = require('../models/Artist');
const Song = require('../models/Song');

const getAll = catchError(async(req, res) => {
    const results = await Album.findAll({include:[Artist,Song]});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Album.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Album.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Album.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Album.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}