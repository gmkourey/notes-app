var router = require("express").Router();
var notesController = require("../../controllers/NotesController");
var userController = require("../../controllers/UserController");

// api/note
router.route("/note")
    .get(notesController.findAll)
    .post(notesController.createNote);

router.route("/user")
    .get(userController.findAll)
    .post(userController.createUser)
 
// api/note/:id
router
    .route("/note/:id")
    .get(notesController.findById)
    .put(notesController.update)
    .delete(notesController.remove);

module.exports = router; 