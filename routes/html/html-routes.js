var path = require("path");

// module.exports = function(app) {
//     app.get("/notes", function(req, res) {
//         res.sendFile(path.join(__dirname, "../../client/test.html"));
//     })
// }

module.exports = function(app) {
    app.get("/", function(req, res) {
        // res.status(200).send("Hi testing ok");
        res.sendFile(path.join(__dirname, "../client/build/index.html"));
    })
}