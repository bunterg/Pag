var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    'use strict';
    //console.log(req);
    res.render('./public/index.html');
});

module.exports = router;