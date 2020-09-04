var express = require('express');
var app = express();

var apiMiddleware = function(req, res, next){
    console.log('inside api middleware');
    next();
 } 

module.exports = apiMiddleware;