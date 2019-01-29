const user = require('../database/user.schema');

function verify(username, email, verification, cb) {
  var search = {
    username: username,
    email: email,
    verification_key: verification,
    verified: false
  };
  user.findOneAndUpdate(search, { verified: true }).then(res => {
    if (res)
      cb("Account Verified");
    else
      cb("Account is not found, or you are stupid");
  }).catch(err => {
    cb("well, verify failed");
  })
}

module.exports = {
  verify: verify
}
