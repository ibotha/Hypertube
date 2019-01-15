const http = require('https');

function getList(limit, options ,cb) {
    if (!limit || limit < 1)
        limit = 1;
    let DATA = "";
    let query = "?";
    switch (options) {
      case 'limit':
        query += 'limit=' + limit;
    }
    http.get('https://yts.am/api/v2/list_movies.jsonp' + query, res => {
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
    getList: getList
};
