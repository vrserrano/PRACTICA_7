var express = require('express');
var router = express.Router();
var personasController = require('../controllers/personas-controller');

const { check } = require("express-validator");

const validPersona = [
  check('nombre')
    .not().isEmpty().withMessage("Nombre no debe estar vacío")
    .isLength({ min: 3 }).withMessage('Nombre debe contener al menos 3 caracteres')
    .matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/).withMessage('Nombre no debe contener números'),
  check('apellidos')
    .not().isEmpty().withMessage("Apellidos no debe estar vacío")
    .isLength({ min: 3 }).withMessage('Apellidos debe contener al menos 3 caracteres')
    .matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/).withMessage('Apellidos no debe contener números'),
  check('colorFavorito')
    .not().isEmpty().withMessage("Color no debe estar vacío")
    .isLength({ min: 3 }).withMessage('Color debe contener al menos 3 caracteres')
    .matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/).withMessage('Color no debe contener números'),
  check('cumpleanos')
    .not().isEmpty().withMessage("Cumpleanos no debe estar vacío")
    .isISO8601().withMessage("Fecha debe estar en formato ISO8601 (AAAA-MM-DD)"),
  check('edad')
    .not().isEmpty().withMessage("Edad no debe estar vacío")
    .isInt({ min: 0, max: 125 }).withMessage('Edad debe estar comprendida entre 0 y 125'),
  check('sexo')
    .not().isEmpty().withMessage("Sexo no debe estar vacío")
    .isIn(["Hombre", "Mujer", "No definido", "Otro"]).withMessage('Sexo debe ser Hombre/Mujer/Otro/No definido'),
  check('dni')
    .isLength({ min: 9, max: 9 }).withMessage('Dni debe contener solo 9 caracteres')
    .isAlphanumeric().withMessage('Dni debe ser alfanumérico')
];

/* POST crea persona. */
router.post('/', validPersona, personasController.personaCrear);

/* GET lista personas. */
router.get('/', personasController.personaLista);

/* PUT actualiza persona. */
router.put('/:id', validPersona, personasController.personaActualizar);

/* DELTE elimina persona. */
router.delete('/:id', personasController.personaEliminar);

module.exports = router;