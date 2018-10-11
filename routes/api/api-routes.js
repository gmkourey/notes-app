var router = require("express").Router();
var notesController = require("../../controllers/NotesController");
var userController = require("../../controllers/UserController");

// api/note
router.route("/note")
    .post(notesController.createNote);

router.route("/notes/user/:email")
    .get(notesController.findAll)
// router.route("/note/:id")
//     .post(notesController.createNote);

router.route("/user")
    .get(userController.findAll)
    .post(userController.createUser)

router.route("/:id")
    .get(notesController.findNote)
    .put(notesController.updateNote)
    .delete(notesController.deleteNote)

router.route("/:id/:sharedId")
    .put(notesController.addSharedUser)

router.route("shared/:email")
    .get(notesController.getSharedNotes)
// api/note/:id
// router
//     .route("/note/:id")
//     .get(notesController.findById)
//     .put(notesController.update)
//     .delete(notesController.remove)

module.exports = router; 