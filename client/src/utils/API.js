import axios from "axios";

export default {
    getNotes: function(userId) {
        return axios.get("/api/notes/user/" + userId)
    },
    
    saveNote: function(NoteData) {
        return axios.post("/api/note", NoteData);
    },

    getNote: function(id) {
        console.log(id);
        return axios.get("/api/" + id)
    },

    updateNote: function(id, body) {
        return axios.put("/api/" + id, body);
    },

    deleteNote: function (id) {
        return axios.delete("/api/" + id);
    },

    addSharedUser: function(noteId, userId) {
        return axios.put("/api/" + noteId + "/" + userId)
    },

    getSharedNotes: function(userId) {
        return axios.get("/api/shared/" + userId)
    }
}
