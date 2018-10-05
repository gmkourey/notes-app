var router = require("express").Router();
var noteRoute = require("./api-routes");

router.use("/api", noteRoute);

module.exports = router;