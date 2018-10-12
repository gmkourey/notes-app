
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
<<<<<<< HEAD
    key:{
        type:Number,
        unique: true
=======
    sharedWith: {
        type: Array,
>>>>>>> 6c9a2e1d7aa57752d764cc59f4275d7d26e7685d
    }

    
})

var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;