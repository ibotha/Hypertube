const archive = require('archive.org');

function getArchiveList(query, cb)
{
  archive.search({q: query}, (err, res) => {
    cb(res);
  })
}

module.exports = {
  getArchiveList: getArchiveList
}
