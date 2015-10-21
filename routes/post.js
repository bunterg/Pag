/**
 * Created by Bernardo on 10/20/2015.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    'use strict';
    console.log('asdasd');
    res.render('post');
});

module.exports = router;