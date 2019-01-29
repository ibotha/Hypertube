const user = require('../database/user.schema');

function verify(ssoid, type, email, verification) {
  var search = {
    email: email,
    verification, verification
  };
  switch (type) {
    case "google":
      search.push( { ssoid: { google: ssoid } } );
      break;
    case "facebook":
      search.push( { ssoid: { facebook: ssoid } } );
      break;
    case "intra":
      search.push( { ssoid: { intra: ssoid } } );
      break;
    case "twitter":
      search.push( { ssoid: { twitter: ssoid } } );
      break;
    case "standard":
      break;
  }
  user.find(search).then(user => {
    returnPromise(user, null);
  }).catch(err => {
    returnPromise(null, err);
  })
}

function returnPromise(success, err) {
  return new Promise(function(resolve, reject) {
    if (err)
      reject(err)
    if (success)
      resolve(success);
  });
}

module.exports = {
  verify: verify
}
