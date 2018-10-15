var router = require("express").Router();
var notesController = require("../../controllers/NotesController");

// api/note
router.route("/note")
    .post(notesController.createNote);

router.route("/notes/user/:email")
    .get(notesController.findAll)

router.route("/:id")
    .get(notesController.findNote)
    .put(notesController.updateNote)
    .delete(notesController.deleteNote)

router.route("/:id/:sharedId")
    .put(notesController.addSharedUser)

router.route("/shared/:email")
    .get(notesController.getSharedNotes)

module.exports = router; 