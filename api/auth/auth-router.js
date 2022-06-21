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
      res.json({message: `Welcome ${username}!`})

  } catch(err) {
      next(err)
  }
  
})

router.get('/logout', async (req, res, next) => {
  if (req.session.user == null) {
   res.json({ message: "no session"});
   return;
  }

  req.session.destroy(err => {
   if (err != null) {
       res.status(500).json({message: "logout failed"});
       return;
   }
  });

  res.json({ message: "logged out"});
})
 
module.exports = router
