import axios from "axios";

// export const saveNote =  (NoteData) => {
//     return axios.post("/api/note", NoteData)
// }

export default {
    // Save note to database
    saveNote: function(NoteData) {
        console.log(NoteData)
        return axios.post("/api/note", NoteData);
    },
    //
    getNotes: function() {
        return axios.get("/api/note/");
    },
    getNote: function(id) {
        return axios.get("/api/note/" + id);
    },
    updateNote: function(id, title) {
        return axios.put("/api/note/" + id, title);
    }
}

// export default saveNote;