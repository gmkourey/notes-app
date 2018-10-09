import axios from "axios";

// export const saveNote =  (NoteData) => {
<<<<<<< HEAD
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
=======
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
>>>>>>> c9855dc647407bed4b8582e594821fe984d921e6
