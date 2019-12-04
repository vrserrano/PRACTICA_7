// Incluir el fichero con la definición de la BD
var db = require('../db/db');
const { validationResult } = require("express-validator");
const ObjectID = require("mongodb").ObjectID;


// Conectar con la BD
db.connect('mongodb://localhost:27017', function (err) {
    if (err) {
        throw ('Fallo en la conexión con la BD');
    }
});

// Display all users
module.exports.personaLista = function (req, res) {
    db.get().db('practica7').collection('persona').find({}).toArray(function (error, datos) {
        if (error) {
            throw ('Fallo en la conexión con la BD');
        } else {
            res.send(datos);
        }
    });
};

// Create one user
module.exports.personaCrear = function (req, res) {
    const errors = validationResult(req); if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

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

// Update users
module.exports.personaActualizar = function (req, res, next) {
    if (db.get() === null) {
        next(new Error('La conexión no está establecida'));
        return;
    }

    const errors = validationResult(req); if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const filter = { "_id": new ObjectID(req.params.id) };
    const update = {
        $set: {
            nombre: req.body.nombre,
            appelidos: req.body.apellidos,
            edad: req.body.edad,
            dni: req.body.dni,
            cumpleanos: req.body.cumpleanos,
            colorFavorito: req.body.colorFavorito,
            sexo: req.body.sexo,
        }
    };

    // Insertar un documento
    db.get().db('practica7').collection('persona').updateOne(filter, update, { upsert: true }, function (err, result) {
        // Si se produjo un error, enviar el error a la siguiente función
        if (err) {
            next(new Error('Fallo en la conexión con la BD ' + err)); return;
        } else {
            res.send(result);
        }
    });
};

// Delete users
module.exports.personaEliminar = function (req, res, next) {
    if (db.get() === null) {
        next(new Error('La conexión no está establecida'));
        return;
    }

    const filter = { "_id": new ObjectID(req.params.id) };
    // Eliminar un documento 
    db.get().db('practica7').collection('persona').deleteOne(filter, function (err, result) {
        // Si se produjo un error, enviar el error a la siguiente función
        if (err) {
            next(new Error('Fallo en la conexión con la BD'));
            return;
        } else {
            // Si todo fue bien, devolver el resultado al cliente
            res.send(result);
        }
    });
};