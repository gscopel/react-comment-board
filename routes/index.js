var express = require('express');
var router = express.Router();
var Promise = require('bluebird')

var React = require('react')
var ReactRouter = require('react-router')
var ReactDOMServer = require('react-dom/server')

var serverapp = require('../public/build/es5/serverapp')
var store = require('../public/build/es5/stores/store')
var Home = require('../public/build/es5/components/layout/Home')

matchRoutes = function(req, routes){
  return new Promise(function(resolve, reject){
    ReactRouter.match({ routes, location: req.url }, function(error, redirectLocation, renderProps){
      if (error){
        reject(error)
        return
      }
      resolve(renderProps)
    })
  })
}

/* GET home page. */
router.get('/', function(req, res, next) {

  var initialStore = null
  var reducers = {}

  initialStore = store.configureStore(reducers)

  var routes = {
    path: '/',
    component: serverapp,
    initial: initialStore,
    indexRoute: {
      component: Home
    }
  }

  matchRoutes(req, routes)
  .then(function(renderProps){
    console.log('test 1')
  })
  .catch(function(err){
    console.log('test 2 error' + err)
  })

  res.render('index', { react: '' });
});

module.exports = router;
