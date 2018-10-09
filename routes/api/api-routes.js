var router = require("express").Router();
var notesController = require("../../controllers/NotesController");

// api/note
router.route("/note")
    .get(notesController.findAll)
    .post(notesController.createNote);
 
// api/note/:id
router
    .route("/note/:id")
    .get(notesController.findById)
    .put(notesController.update)
    .delete(notesController.remove);

module.exports = router; 