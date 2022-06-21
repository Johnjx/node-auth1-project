const db = require('../../data/db-config')

/*
  If the user does not have a session saved in the server

  status 401
  {
    "message": "You shall not pass!"
  }
*/
function restricted() {

}

/*
  If the username in req.body already exists in the database

  status 422
  {
    "message": "Username taken"
  }
*/
async function checkUsernameFree(req, res, next) {
  let { username } = req.body;
  const existingUser = await db('users').where({username}).first();
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

/*
  If password is missing from req.body, or if it's 3 chars or shorter

  status 422
  {
    "message": "Password must be longer than 3 chars"
  }
*/
function checkPasswordLength(req, res, next) {
  let { password } = req.body;
  if (password === undefined || password.toString().trim().length < 3) {
    next({ status: 422, message: "Password must be longer than 3 chars" });
    return;
  }
  next();
}

// Don't forget to add these to the `exports` object so they can be required in other modules

module.exports = {
  checkPasswordLength,
  checkUsernameExists,
  checkUsernameFree,
  restricted
}
