// Incluir el fichero con la definición de la BD
var db = require('../db/db');

// Display all users
module.exports.persona_lista = function (req, res) {
    res.send('NOT IMPLEMENTED: Lista persona');
};
// Create one user
module.exports.persona_crear = function (req, res) {
    res.send('NOT IMPLEMENTED: Crear persona');
};

// Create one user
module.exports.persona_crear = function (req, res) {
    const persona = {};
    persona.nombre = req.body.nombre;
    persona.apellidos = req.body.apellidos;
    persona.edad = req.body.edad;
    persona.dni = req.body.dni;
    persona.cumpleaños = req.body.cumpleaños;
    persona.colorFavorito = req.body.colorFavorito;
    persona.sexo = req.body.sexo;
    db.get().db('apidb').collection('persona').insertOne(user, function
        (err, result) {
        if (err) {
            throw ('Fallo en la conexión con la BD');
        } else {
            res.send(result);
        }
    });
};

/* POST create user. */
router.post('/', personas_controller.persona_crear);
