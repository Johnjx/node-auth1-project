const router = require('express').Router()
const usersModel = require('../users/users-model')
const bcrypt = require('bcryptjs')
const { checkUsernameFree, checkUsernameExists, checkPasswordLength } = require ('./auth-middleware')

router.post('/register', checkUsernameFree, checkPasswordLength, async (req, res, next) => {
  const { username, password } = req.body;

  const hash = bcrypt.hashSync(password, 12)
  const user = await usersModel.add({ username, password: hash})

  res.json({ user_id: user.user_id, username })
})

/**
  1 [POST] /api/auth/register { "username": "sue", "password": "1234" }

  response:
  status 200
  {
    "user_id": 2,
    "username": "sue"
  }

 */

router.post('/login', (req, res, next) => {
  res.send('hello from auth router login')
})

/**
  2 [POST] /api/auth/login { "username": "sue", "password": "1234" }

  response:
  status 200
  {
    "message": "Welcome sue!"
  }

  response on invalid credentials:
  status 401
  {
    "message": "Invalid credentials"
  }
 */

router.get('/logout', (req, res, next) => {
  res.send('hello from auth router logout')
})  

/**
  3 [GET] /api/auth/logout

  response for logged-in users:
  status 200
  {
    "message": "logged out"
  }

  response for not-logged-in users:
  status 200
  {
    "message": "no session"
  }
 */

 
module.exports = router
