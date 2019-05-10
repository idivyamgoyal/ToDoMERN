const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* TODO Schema */
let todoSchema = new Schema({
    todoDescription: {
        type: String
    },
    todoResponsible: {
        type: String
    },
    todoPriority: {
        type: String
    },
    todoCompleted: {
        type: Boolean
    }
});

module.exports = mongoose.model('todoSchema', todoSchema);