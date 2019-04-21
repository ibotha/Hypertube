const Movie = require('../../mediaApi/database/movie.schema');

async function checkValue(hash, cb){
    await Movie.findOne({InfoHash: hash}, movie => {
        if (movie)
            cb(movie.status);
        else
            cb(null)
    }); 
}

module.exports = {
    checkValue: checkValue
}