var router = require("express").Router();
var notesController = require("../../controllers/NotesController");
var userController = require("../../controllers/UserController");

router.route("/note")
    .get(notesController.findAll)
    .post(notesController.createNote)
router.route("/user")
    .get(userController.findAll)
    .post(userController.createUser)
 

module.exports = router; 