var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  console.log('asdasd');
  res.render('creadorMateria');
});

module.exports = router;
