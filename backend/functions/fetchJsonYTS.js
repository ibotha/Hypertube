const http = require('https');

function getList(limit, options ,cb) {
    if (!limit || limit < 1)
        limit = 1;
    let DATA = "";
    let query = "?";
    query += 'limit=' + ((limit.limit) ? limit.limit : 0);
    query += '&page=' + ((limit.page) ? limit.page : 1);
    query += '&query_term=' + ((limit.query_term) ? limit.query_term : '');
    query += '&sort_by=' + ((limit.sort) ? limit.sort : 'date_added');
    query += '&with_rt_ratings=1';
    http.get('https://yts.am/api/v2/list_movies.json' + query, res => {
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
