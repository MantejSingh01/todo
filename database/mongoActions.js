const mongoose = require("mongoose");
const Todo = require("./todoSchema");

async function getAllTodos() {
  try {
    // const res = await Todo.find({},{todoName:1,_id:0})
    const res = await Todo.aggregate([
      {
        $project: {
          todoName: 1,
        },
      },
    ]);
    return res;
  } catch (error) {
    console.log("mongodb error", error);
  }
}

async function addTodo(todoName, description) {
  const res = await Todo.create({ todoName });
  return res;
}

async function deleteTodo(deleteId) {
  const res = await Todo.findByIdAndDelete(deleteId);
  return res
}

async function updateTodo(params) {
  const { updateId, updatedText } = params;
  const res = await Todo.updateOne(
    { _id: updateId },
    { $set: { todoName: updatedText } }
  );
  if (res.acknowledged && res.modifiedCount) {
    return true;
  }
}

module.exports = { getAllTodos, addTodo, deleteTodo, updateTodo };
