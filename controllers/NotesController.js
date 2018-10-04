const db = require("../models");

module.exports = {
    findAll: function(req, res) {
        db.Note
            .find(req.query)
            .sort({dateAdded: -1})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    },
    createNote: function(req, res) {
        db.Note

            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    }
}