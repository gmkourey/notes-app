
var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var NoteSchema = new Schema({
    title: {
        type: String
    },
    content: {
        // type: String,
        type: Object,
        // unique: false
        index: false
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