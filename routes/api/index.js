var router = require("express").Router();
var apiRoute = require("./api-routes");

router.use("/api", apiRoute);

module.exports = router;