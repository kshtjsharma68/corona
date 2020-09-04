var express = require('express');

var router = express();
var apiMiddleware = require('../middleware/api.js');

router.use(apiMiddleware);

router.get('/login', function(req, res) {
    res.json(200, {success: true});
});

module.exports =  router;