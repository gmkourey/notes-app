
var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var NoteSchema = new Schema({
    title: {
        type: String
    },
    content: {
        type: String,
        unique: false
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: String
    },
    sharedWith: {
        type: Array,
    }
    
})

var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;