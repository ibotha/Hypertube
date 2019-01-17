const parseString = require('xml2js').parseString;
const http        = require('https');
const Parser      = require('rss-parser');
const parser      = new Parser();

async function getArchiveList(cb)
{
  let feed = await parser.parseURL('https://archive.org/services/collection-rss.php?collection=moviesandfilms');
  cb(feed);
}

module.exports = {
  getArchiveList: getArchiveList
}
