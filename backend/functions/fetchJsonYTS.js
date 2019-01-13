const http = require('https');

function getUpcoming(cb) {
    let DATA = "";
    http.get('https://yts.am/api/v2/list_upcoming.json', res => {
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            DATA += chunk;
        })
        res.on('end', res => {
            cb(DATA);
        })
    })
}

function getList(limit ,cb) {
    if (!limit || limit < 1)
        limit = 1;
    let DATA = "";
    http.get('https://yts.am/api/v2/list_movies.jsonp?limit=' + limit, res => {
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            DATA += chunk;
        });
        res.on('end', res => {
            cb(DATA);
        })
    })
}

module.exports = {
    getList: getList,
    getUpcoming: getUpcoming
};