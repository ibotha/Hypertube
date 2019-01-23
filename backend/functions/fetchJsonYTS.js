const http = require('https');

function getList(limit ,cb) {
    if (!limit || limit < 1)
        limit = 1;
    let DATA = "";
    let query = "?";

    limit.sort = limit.sort.replace(/\s\s+/g, '_');
    limit.sort = limit.sort.toLowerCase();
    query += 'limit=' + ((limit.limit) ? limit.limit : 0);
    query += '&page=' + ((limit.page) ? limit.page : 1);
    query += '&query_term=' + ((limit.query_term && limit.query_term !== undefined && limit.query_term !== 'undefined') ? limit.query_term : '');
    query += '&sort_by=' + ((limit.sort && limit.sort !== null && limit.sort !== 'null') ? limit.sort : 'date_added');
    console.log(query);
    http.get('https://yts.am/api/v2/list_movies.jsonp' + query, res => {
        //res.setEncoding('utf8');
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
