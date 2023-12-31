import axios from "axios";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../Redux/todoSlice";

const List = (props) => {
  const { todo, setTodo } = props;

  const [editId, setEditId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const dispatch  = useDispatch()
  const handleEdit = (objId) => {
    setEditId(objId);
    const editedTodo = todo.find((item) => item._id === objId);
    setEditedText(editedTodo ? editedTodo.todoName : "");
  };
console.log("=========>>>>>>",todo)
  const handleSave = async (objId) => {
    const updatedTodo = todo.map((item) =>
      item._id === objId ? { ...item, todoName: editedText } : item
    );

    const result = await axios.post("http://localhost:3002/updateTodo", {
      updateId: objId,
      updatedText: editedText,
    });

    console.log(result,"=======>>> afetr editing");
    setTodo(updatedTodo);
    setEditId(null);
    setEditedText("");
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditedText("");
  };

  const handleDelete = async (objId) => {
    // let updatedTodo = todo.filter((val) => val._id !== objId);
    const result = await axios.post("http://localhost:3002/deleteTodo", {
      deleteId: objId,
    });
    console.log(result.status);
    // setTodo(updatedTodo);
    if(result.status == 200)  dispatch(deleteTodo(objId))
    
  };

  return (
    <>
      {todo && todo.length > 0 && (
        <div
          className={`bg-white w-3/12 items-start flex-col p-3 m-2 rounded ${
            todo.length < 0 ? " hidden" : "flex"
          }`}
        >
          {todo.length > 0 &&
            todo.map((item) => (
              <ol
                className="border-white border-solid rounded-md p-1 border-2 w-full flex items-start my-1 text-md justify-between bg-black text-white truncate text-ellipsis"
                key={item._id}
              >
                {editId === item._id ? (
                  <>
                    <div className="w-full flex justify-between">
                      <input
                        type="text"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        maxLength={250}
                        className="w-full border rounded-sm text-black focus-visible:border-none outline-none"
                      />
                      <div>
                        <button onClick={() => handleSave(item._id)}>
                          <CheckIcon fontSize="small" className="m-1" />
                        </button>
                        <button onClick={handleCancelEdit}>
                          <CancelSharpIcon fontSize="small" className="m-1" />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <span className=" truncate text-ellipsis pr-2">
                      {item.todoName}
                    </span>
                    <span className="flex justify-center items-center">
                      <button onClick={() => handleEdit(item._id)}>
                        <EditIcon fontSize="small" className="m-1" />
                      </button>
                      <button onClick={() => handleDelete(item._id)}>
                        <CancelSharpIcon fontSize="small" className="m-1" />
                      </button>
                    </span>
                  </>
                )}
              </ol>
            ))}
        </div>
      )}
    </>
  );
};

export default React.memo(List);
