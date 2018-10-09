var router = require("express").Router();
var notesController = require("../../controllers/NotesController");

router.route("/note")
    .get(notesController.findAll)
    .post(notesController.createNote)

router.route("/:id")
    .get(notesController.findNote)
    .put(notesController.updateNote)
    .delete(notesController.deleteNote)
 

module.exports = router; 