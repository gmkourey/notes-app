import axios from "axios";

export default {
    saveNote: function(NoteData) {
        return axios.post("/api/note", NoteData);
    }
}