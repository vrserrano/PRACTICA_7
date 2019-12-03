var express = require('express');
var router = express.Router();
var personasController = require('../controllers/personas-controller');

/* POST create user. */
router.post('/', personasController.personaCrear);

/* GET users listing. */
router.get('/', personasController.personaLista);

module.exports = router;