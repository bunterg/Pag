var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./public/index.html');
});
// POST method route
router.post('/', function (req, res) {
  console.log("asd");
})
module.exports = router;