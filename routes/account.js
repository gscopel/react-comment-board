var express = require('express')
var router = express.Router()
var ProfileController = require('../controllers/ProfileController')
var bcrypt = require('bcrypt')

router.get('/:action', function(req, res, next){

  var action = req.params.action
  if (action == 'logout'){
    req.session.reset()
      res.json({
        confirmation: 'success',
        message: 'See ya next time!'
      })
  }

  if (action == 'currentuser'){
   //Error handled for no session
    if (req.session == null){
      res.json({
        confirmation: 'fail',
        message: 'User is not logged in'
      })
      return
    }
    //Error handled for session tracking anything other than user
    if (req.session.user == null){
      res.json({
        confirmation: 'fail',
        message: 'User is not logged in'
      })
      return
    }
    //Retrive profile from session
    ProfileController.findById(req.session.user, function(err, result){
      if (err){
        res.json({
          confirmation: 'fail',
          message: err
        })
        return
      }
      res.json({
        confirmation: 'success',
        user: result
      })
    })
   }
})

router.post('/:action', function(req, res, next){

  var action = req.params.action
  //Login user after they register
  if (action == 'register'){
    ProfileController.create(req.body, function(err, result){
      if (err){
        res.json({
          confirmation: 'fail',
          message: err.message
        })
        return
      }
      req.session.user = result._id
      res.json({
        confirmation: 'success',
        user: result
      })
    })
  }
  if (action == 'login'){
    var params = {username: req.body.username}
    ProfileController.find(params, function(err, results){
      if (err){
        res.json({
          confirmation: 'fail',
          message: err.message
        })
        return
      }
      if (results.length == 0){
        res.json({
          confirmation: 'fail',
          message: 'This username does not exist.'
        })
        return
      }
      var profile = results[0]
      var isPasswordCorrect = bcrypt.compareSync(req.body.password, profile.password)
        if (isPasswordCorrect == false){
          res.json({
            confirmation: 'fail',
            message: 'wrong password'
          })
          return
        }

        //Assign cookie session to user
        req.session.user = profile._id

        res.json({
          confirmation: 'success',
          user: profile
        })
     })
   }
})

module.exports = router
