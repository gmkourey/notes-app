
var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var FolderSchema = new Schema({

    title: {
        type: String,
        unique: false,
        required: true
    },
    tags: [{
        type: String
    }],
    
    dateAdded: {
        type: Date,
        default: Date.now
    },
    
})

var Folder = mongoose.model("Folder", FolderSchema);

module.exports = Folder;