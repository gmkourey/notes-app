import axios from "axios";

export const saveNote =  (NoteData) => {
    axios.post("/api/note", NoteData)
    .then(console.log(NoteData))
    .catch(err => console.log(err))
}


// export default {
//     saveNote: function(NoteData) {
//         console.log(NoteData)
//         return axios.post("/api/note", NoteData);
//     }
// }

// export default saveNote;