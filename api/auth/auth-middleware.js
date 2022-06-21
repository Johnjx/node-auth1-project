const usersModel = require('../users/users-model')

/*
  If the user does not have a session saved in the server

  status 401
  {
    "message": "You shall not pass!"
  }
*/
function restricted() {

}


async function checkUsernameFree(req, res, next) {
  let { username } = req.body;
  const existingUser = await usersModel.findBy({username}).first()
  if (existingUser) {
    next({ status: 422, message: "Username taken" });
    return;
  }
  next();
}

/*
  If the username in req.body does NOT exist in the database

  status 401
  {
    "message": "Invalid credentials"
  }
*/
function checkUsernameExists() {

}

function checkPasswordLength(req, res, next) {
  let { password } = req.body;
  if (password === undefined || password.toString().trim().length < 3) {
    next({ status: 422, message: "Password must be longer than 3 chars" });
    return;
  }
  next();
}

module.exports = {
  checkPasswordLength,
  checkUsernameExists,
  checkUsernameFree,
  restricted
}
