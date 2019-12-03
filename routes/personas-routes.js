var express = require('express');
var router = express.Router();
var personasController = require('../controllers/personas-controller');

/* GET users listing. */
router.get('/', personasController.persona_lista);

/* POST create user. */
router.post('/', personasController.persona_crear);


module.exports = router;