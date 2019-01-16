const archive = require('archive.org');

function getArchiveList(query, cb)
{
  archive.search({q: query}, (err, res) => {
    console.log(res);
    cb(res);
  })
}

module.exports = {
  getArchiveList: getArchiveList
}
