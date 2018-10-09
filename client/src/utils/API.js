import axios from "axios";

export default {
    getNotes: function() {
        return axios.get("/api/note")
    },

    saveNote: function(NoteData) {
        console.log(NoteData)
        return axios.post("/api/note", NoteData);
    },

    getNote: function(id) {
        return axios.get("/api/note" + id)
    },

    updateNote: function(id, NoteData) {
        return axios.put("/api/" + id, NoteData);
    },

    deleteNote: function (id) {
        return axios.delete("/api/" + id);
    }


}