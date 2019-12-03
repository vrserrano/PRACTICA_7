// Incluir el fichero con la definición de la BD
var db = require('../db/db');

// Conectar con la BD
db.connect('mongodb://localhost:27017', function (err) {
    if (err) {
        throw ('Fallo en la conexión con la BD');
    }
});

// Display all users
module.exports.personaLista = function (req, res) {
    db.get().db('practica7').collection('persona').find({}).toArray(function (error, datos) {
        var arrayRespuesta = []
        // se elimina de la búsqueda de la base de datos, todos los _id
        for (indice = 0; indice < datos.length; indice++) {
            // se genera un objeto nuevo usando los datos del objeto de la
            // base de datos pero solo usando los valores que nos interesan
            let documentoRespuesta = {
                "nombre": datos[indice].nombre,
                "apellidos": datos[indice].apellidos,
                "edad": datos[indice].edad,
                "dni": datos[indice].dni,
                "cumpleanos": datos[indice].cumpleanos,
                "colorFavorito": datos[indice].colorFavorito,
                "sexo": datos[indice].sexo
            };
            arrayRespuesta.push(documentoRespuesta)
        }
        if (error) {
            throw ('Fallo en la conexión con la BD');
        } else {
            res.send(arrayRespuesta);
        }
    });


};

// Create one user
module.exports.personaCrear = function (req, res) {
    const persona = {};
    persona.nombre = req.body.nombre;
    persona.apellidos = req.body.apellidos;
    persona.edad = req.body.edad;
    persona.dni = req.body.dni;
    persona.cumpleanos = req.body.cumpleanos;
    persona.colorFavorito = req.body.colorFavorito;
    persona.sexo = req.body.sexo;
    db.get().db('practica7').collection('persona').insertOne(persona, function
        (err, result) {
        if (err) {
            throw ('Fallo en la conexión con la BD');
        } else {
            res.send(result);
        }
    });
};
