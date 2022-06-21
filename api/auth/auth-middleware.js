const usersModel = require('../users/users-model')


function restricted(req, res, next) {
  if(req.session.user == null) {
    res.status(401).json({message: "You shall not pass!"});
    return;
  }
  next();
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

async function checkUsernameExists(req, res, next) {
  const { username } = req.body;

  const existingUser = await usersModel.findBy({username}).first()
  if (existingUser == null) {
    next({ status: 401, message: "Invalid credentials" });
    return;
  }
  req.existingUser = existingUser
  next()
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
