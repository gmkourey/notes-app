var router = require("express").Router();
var notesController = require("../../controllers/NotesController");
var userController = require("../../controllers/UserController");

// api/note
router.route("/note")
    .get(notesController.findAll)
<<<<<<< HEAD
    .post(notesController.createNote);

=======
router.route("/note/:id")
    .post(notesController.createNote)
>>>>>>> c9855dc647407bed4b8582e594821fe984d921e6
router.route("/user")
    .get(userController.findAll)
    .post(userController.createUser)

router.route("/:id")
    .get(notesController.findNote)
    .put(notesController.updateNote)
    .delete(notesController.deleteNote)
 
// api/note/:id
router
    .route("/note/:id")
    .get(notesController.findById)
    .put(notesController.update)
    .delete(notesController.remove);

module.exports = router; 