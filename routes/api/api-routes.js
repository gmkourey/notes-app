var router = require("express").Router();
var notesController = require("../../controllers/NotesController");
var userController = require("../../controllers/UserController");

router.route("/note")
    .get(notesController.findAll)
router.route("/note/:id")
    .post(notesController.createNote)
router.route("/user")
    .get(userController.findAll)
    .post(userController.createUser)

router.route("/:id")
    .get(notesController.findNote)
    .put(notesController.updateNote)
    .delete(notesController.deleteNote)
 

module.exports = router; 