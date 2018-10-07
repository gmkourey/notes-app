import axios from "axios";

export const saveNote =  (NoteData) => {
    return axios.post("/api/note", NoteData)
}


// export default {
//     saveNote: function(NoteData) {
//         console.log(NoteData)
//         return axios.post("/api/note", NoteData);
//     }
// }

// export default saveNote;