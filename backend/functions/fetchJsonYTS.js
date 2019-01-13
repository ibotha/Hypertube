const http = require('https');

function getList(limit ,cb) {
    if (!limit || limit < 1)
        limit = 1;
    const DATA = [];
    http.get('https://yts.am/api/v2/list_movies.json?limit=' + limit, function(res) {
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            DATA.push(chunk);
        });
        res.on('end', res => {
            cb(DATA);
        })
    })
}

module.exports = {
    getList: getList
};