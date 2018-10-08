import axios from "axios";

export const saveNote =  (NoteData) => {
    return axios.post("/api/note", NoteData)
};

export const saveUser =  (UserData) => {
    console.log("fishfishfgoatfishapple" + UserData)
    return axios.post("/api/user", UserData)
};



// export default {
//     saveNote: function(NoteData) {
//         console.log(NoteData)
//         return axios.post("/api/note", NoteData);
//     }
// }

// export default saveNote;