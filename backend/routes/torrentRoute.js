const express		= require('express');
const router		= express.Router();
const yts       = require('../functions/fetchJsonYTS');
const aorg      = require('../functions/archive.org');
const query     = require('../functions/querydb');
const Movie     = require('../../mediaApi/database/movie.schema');


router.get('/getlist', (req, res) => {
  yts.getList(req.query, result => {
      _json = JSON.parse(result);
      try {
        for(let p of _json['data']['movies'])
        {
          for (let x of p['torrents'])
          {
            var movie = Movie.findOne({InfoHash: x['hash']})
            movie.exec()
            movie.then(res => {
              if (res)
                x['hash'] = res.status;
              else
                x['hash'] = "";
              console.log(res);
            })
          }
        }  
      } catch (error) {
        
      }
      finally {
        res.status(200).jsonp(JSON.stringify(_json));
      }
      
  });
});

router.get('/getarchive', (req, res) => {
  aorg.getArchiveList(result => {
    if (typeof result == 'object')
      res.status(200).jsonp(result);
    else
      res.status(200).jsonp({"Error": "Eish"});
  })
})

module.exports = router;
