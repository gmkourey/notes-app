var router = require("express").Router();
var notesController = require("../../controllers/NotesController");

router.route("/note")
    .get(notesController.findAll)
    .post(notesController.createNote)
 

module.exports = router; 