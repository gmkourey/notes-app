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
        console.log("test: " + JSON.stringify(req.body));
        db.Note
            .create(req.body)
            .then(dbNote => {
                console.log(db.User)
                console.log("text" + req.params.id)
                return db.User.findOneAndUpdate({
                    _id: req.params.id
                },
                {
                    $push: {notes: dbNote }
                },
                {
                    new: true
                })
                .then(console.log(dbNote))
            })
            .then(dbUser => {
                console.log(dbUser)
                res.json(dbUser)})
            .catch(err => res.status(422).json(err))
    }
}