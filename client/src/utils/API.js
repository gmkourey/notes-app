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
        return axios.get("/api/note");
    }
}

// export default saveNote;