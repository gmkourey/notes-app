var router = require("express").Router();
var notesController = require("../../controllers/NotesController");

router.route("/note")
    .get(notesController.findAll)
    .post(notesController.createNote)

router.route("/:id")
    .get(notesController.findById)
    .update(notesController.findOneAndUpdate)
 

module.exports = router; 