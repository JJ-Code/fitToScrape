const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title: String,
    body: String
});

// export const Note = mongoose.model("Note", NoteSchema)
const Note = mongoose.model("Note", NoteSchema);
module.exports = Note;
