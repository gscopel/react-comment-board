var express = require('express')
var router = express.Router()
var controllers = require('../controllers')

router.get('/:resource', function(req, res, next){

  const resource = req.params.resource
  const controller = controllers[resource]

  if (controller == null){
    res.json({
      confirmation: 'fail',
      message: resource + ' not found'
    })
    return
  }

  controller.find(req.query, function(err, results){
    if (err){
      res.json({
        confirmation: 'fail',
        message: err
      })
      return
    }
    res.json({
      confirmation: 'success',
      results: results
    })
  })
})

router.get('/:resource/:id', function(req, res, next){

  const resource = req.params.resource
  const id = req.params.id

  const controller = controllers[resource]

  if (controller == null){
    res.json({
      confirmation: 'fail',
      message: resource + ' not found'
    })
    return
  }

   controller.findById(id, function(err, result){
      if (err){
        res.json({
          confirmation: 'fail',
          message: err
        })
        return
      }
      res.json({
        confirmation: 'success',
        result: result
      })
   })
})

router.post('/:resource', function(req, res, next){

    const resource = req.params.resource

    const controller = controllers[resource]

    if (controller == null){
      res.json({
        confirmation: 'fail',
        message: resource + ' not found'
      })
      return
    }

    controller.create(req.body, function(err, result){
      if (err){
        res.json({
          confirmation: 'fail',
          message: err
        })
        return
      }
      res.json({
        confirmation: 'success',
        result: result
      })
   })
})

module.exports = router
