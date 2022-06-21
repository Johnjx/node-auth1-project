const router = require('express').Router()
const { restricted } = require('../auth/auth-middleware')
const usersModel = require('./users-model')

router.get('/', restricted, (req, res, next) => {
  usersModel.find()
  .then(users => res.json(users))
  .catch(next)
})

/**
  [GET] /api/users

  This endpoint is RESTRICTED: only authenticated clients
  should have access.

  response:
  status 200
  [
    {
      "user_id": 1,
      "username": "bob"
    },
    // etc
  ]

  response on non-authenticated:
  status 401
  {
    "message": "You shall not pass!"
  }
 */


module.exports = router
