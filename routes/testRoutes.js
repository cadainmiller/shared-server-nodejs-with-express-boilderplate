var express = require('express');
const testControllers = require('../controllers/testController');

var router = express.Router();

router.get('/Get', testControllers.get);

module.exports = router;
