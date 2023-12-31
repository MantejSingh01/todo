const mongoose = require("mongoose")

const todoSchema =  mongoose.Schema({
    todoName:{
        type:String,
        required:true
    },
    todoDescription:{
        type:String
    }

})
const Todo = mongoose.model('Todo',todoSchema);

module.exports = Todo;






