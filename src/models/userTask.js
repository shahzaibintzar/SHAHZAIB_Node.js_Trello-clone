const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    email: {type: String,required: true},
    title: {type: String,required: true},
    description: {type: String,required: true},
    category: {type: String,required: true},
    dueDate: {type: String,required: true},
    priority: {type: String,required: true}
})


const Task = mongoose.model('Task', taskSchema)

module.exports = Task