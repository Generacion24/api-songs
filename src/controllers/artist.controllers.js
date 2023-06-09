const catchError = require('../utils/catchError');
const Artist = require('../models/Artist');
const Genre = require('../models/Genre');

const getAll = catchError(async(req, res) => {
    const results = await Artist.findAll({include:[Genre]});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Artist.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Artist.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Artist.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Artist.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

//  /artists/:id/genres

const setGenres = catchError(async (req,res)=>{
    const {id} = req.params
    const artist = await Artist.findByPk(id)

    await artist.setGenres(req.body)

    const genre = await artist.getGenres()
    return res.json(genre)

})

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setGenres
}