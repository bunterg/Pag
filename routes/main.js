/**
 * Created by Bernardo on 9/23/2015.
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
    'use strict';
    //console.log(req);
    res.render('main');
});

module.exports = router;