const db = require("../models");

module.exports = {
    findAll: function(req, res) {
        db.Note
            .find({userId: req.params.email})
            .sort({dateAdded: -1})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.json(err))
    },
    findById: function(req, res) {
        db.Note
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    createNote: function(req, res) {
        db.Note
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    },
    updateNote: function (req, res) {
        db.Note
            .findOneAndUpdate({_id: req.params.id}, req.body)
            .then(dbModel => res.json(dbModel))
            // .catch(err => res.json(err))
            .catch(err => console.log(err))
    },
    findNote: function(req, res) {
        db.Note
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.json(err))
    },
    deleteNote: function(req, res) {
        db.Note
            .deleteOne({_id: req.params.id})
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.json(err))
    },
    addSharedUser: function(req, res) {
        db.Note
            .findOneAndUpdate({_id: req.params.id}, {$push: {sharedWith: req.params.sharedId}})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.json(err))
    },
    getSharedNotes: function(req, res) {
        db.Note
            .find({sharedWith: req.params.email})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.json(err))
    }
};