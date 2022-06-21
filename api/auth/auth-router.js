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

router.post('/login', checkUsernameExists, async (req, res, next) => {
  try {
      const { username, password } = req.body;

      if(bcrypt.compareSync(password, req.existingUser.password) == false){
        next({status: 401, message: "Invalid credentials"})
        return;
      }

      req.session.user = req.existingUser;
      console.log(req.session)
      res.json({message: `Welcome ${username}!`})

  } catch(err) {
      next(err)
  }
  
})

/**
  2 [POST] /api/auth/login { "username": "sue", "password": "1234" }

  response:
  status 200
  {
    "message": "Welcome sue!"
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
