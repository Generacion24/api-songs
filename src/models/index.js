const Genre = require('./Genre');
const Artist = require('./Artist');
const Album = require('./Album');
const Song = require('./Song');

//Tabla Pivot: "GenreArtist"
Genre.belongsToMany(Artist, {through: "GenreArtist"})
Artist.belongsToMany(Genre, {through: "GenreArtist"})

//Album -> artistId
Album.belongsTo(Artist) //artistId
Artist.hasMany(Album)

//Song -> albunId
Song.belongsTo(Album) //albumId
Album.hasMany(Song)

//Tabla Pivot: "SongArtist"
Song.belongsToMany(Artist,{through: "SongArtist"})
Artist.belongsToMany(Song,{through: "SongArtist"})


//Tabla Pivot: "SongGenre"
Song.belongsToMany(Genre,{through: "SongGenre"})
Genre.belongsToMany(Song,{through: "SongGenre"})
