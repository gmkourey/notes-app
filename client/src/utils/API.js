import axios from "axios";

// export const saveNote =  (NoteData) => {
//     return axios.post("/api/note/:id", NoteData)
// };

// export const saveUser =  (UserData) => {
//     console.log("fishfishfgoatfishapple" + UserData)
//     return axios.post("/api/user", UserData)
// };

export default {
    getNotes: function() {
        return axios.get("/api/note")
    },

    saveNote: function(NoteData) {
        console.log(NoteData)
        return axios.post("/api/note", NoteData);
    },

    saveUser: function(UserData) {
        console.log("fishfishfgoatfishapple" + UserData)
        return axios.post("/api/user", UserData)
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