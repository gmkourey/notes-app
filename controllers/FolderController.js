const db = require("../models");

module.exports = {
    findAll: function(req, res) {
        db.Folder
            .find(req.query)
            .sort({dateAdded: -1})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.json(err))
    },
    findById: function(req, res) {
        db.Folder
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    createFolder: function(req, res) {
        db.Folder
            .create(req.body)
            .then(dbFolder => {
                console.log(db.User)
                console.log("text" + req.params.id)
                return db.User.findOneAndUpdate({
                    _id: req.params.id
                },
                {
                    $push: {Folders: dbFolder }
                },
                {
                    new: true
                })
                .then(console.log(dbFolder))
            })
            .then(dbUser => {
                console.log(dbUser)
                res.json(dbUser)})
            .catch(err => res.status(422).json(err))
    },
    updateFolder: function (req, res) {
        db.Folder
            .findOneAndUpdate({_id: req.params.id}, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.json(err))
    },
    findFolder: function(req, res) {
        db.Folder
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.json(err))
    },
    deleteFolder: function(req, res) {
        db.Folder
            .deleteOne({_id: req.params.id})
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.json(err))
    }
};