/**
 * Created by Bernardo on 10/3/2015.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    'use strict';
    console.log(req);
    res.render('materia');
});

module.exports = router;