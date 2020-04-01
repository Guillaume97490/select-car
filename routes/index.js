var express = require('express');
var router = express.Router();
const controller = require('../controllers/indexController')

/* GET home page. */
router.get('/',controller.home);
router.get('/:brand/models',controller.getModels);
router.get('/:brand/:model/specs',controller.getSpecs);

module.exports = router;