const db = require("../models");

module.exports = {
    findAll: function(req, res) {
        db.User
            .find(req.query)
            .sort({dateAdded: -1})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    },
    createUser: function(req, res) {
        console.log("test: " + JSON.stringify(req.body));
        db.User
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    }
}