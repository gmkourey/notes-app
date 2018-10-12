import axios from "axios";

// export const saveNote =  (NoteData) => {
//     return axios.post("/api/note/:id", NoteData)
// };

// export const saveUser =  (UserData) => {
//     console.log("fishfishfgoatfishapple" + UserData)
//     return axios.post("/api/user", UserData)
// };

export default {
    getNotes: function(userId) {
        return axios.get("/api/notes/user/" + userId)
    },
    saveNote: function(NoteData) {
        return axios.post("/api/note", NoteData);
    },

    // saveUser: function(UserData) {
    //     console.log("fishfishfgoatfishapple" + UserData)
    //     return axios.post("/api/user", UserData)
    // },

    getNote: function(id) {
        console.log(id);
        return axios.get("/api/" + id)
    },

    // updateTitle: function(id, title) {
    //     return axios.put("/api/" + id, title);
    // },

    updateNote: function(id, body) {
        return axios.put("/api/" + id, body);
    },

    deleteNote: function (id) {
        return axios.delete("/api/" + id);
    },

    addSharedUser: function(noteId, userId) {
        return axios.put("/api/" + noteId + "/" + userId)
    }
}
