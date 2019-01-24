var router = require('express').Router();
var auth = require('../auth');



router.get('/', auth.optional, function(req, res) {
  var limit = 20;
  var offset = 0;

  return res.json({init : 'HELLO PORTIFOLIZE'});
});

module.exports = router;
