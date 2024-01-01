import React, { useCallback, useEffect, useMemo, useState } from "react";
import List from "./List";
import ParticleBg from "../particleBg";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, todoThunk } from "../Redux/todoSlice";

const TodoList = () => {
  const [text, setText] = useState("");
  const initialTodoState = useSelector((state) => state.todo);
  const [todo, setTodo] = useState(initialTodoState);
  const [showAlert, setShowAlert] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    // getTodosList();
    dispatch(todoThunk());
  }, []);

  useEffect(() => {
    setTodo(initialTodoState);
  }, [initialTodoState]);

  // handled by redux thunk to get all the values at once

  // const getTodosList = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:3002");
  //     console.log("======================123", res.data);
  //     setTodo(res.data);
  //   } catch (error) {
  //     console.log("error while fetching the data", error);
  //   }
  // };

  const handleText = (e) => {
    let searchedString = e.target.value;
    setText(searchedString);
  };
  const handleClick = async () => {
    try {
      if (text.length > 0) {
        const res = await axios.post("http://localhost:3002/addTodo", {
          todoName: text,
        });
        console.log(res);
        // Handling using redux toolkit

        // setTodo((prevTodo) => [
        //   ...prevTodo,
        //   { _id: res.data._id , todoName:res.data.todoName },
        // ]);

        dispatch(addTodo(res.data));
        setText("");
      } else {
        setShowAlert(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAlert = () => {
    setShowAlert(!showAlert);
  };
  return (
    <div className="p-10 flex  pt-10 items-center bg-black h-full flex-col relative z-10">
      <ParticleBg></ParticleBg>
      <input
        className=" rounded-md border-white border-solid border-2 p-2 mb-2 w-3/12 truncate"
        placeholder="enter todo"
        value={text}
        onChange={handleText}
        maxLength={250}
      />
      <button
        className=" border border-white border-solid mx-2 p-2 rounded-md w-3/12  bg-black text-white"
        onClick={handleClick}
      >
        Add Todo
      </button>
      {showAlert && (
        <>
          <span className=" text-3xl text-black bg-white p-6 m-2  rounded-md absolute h-full">
            {" "}
            Please fill input box first
            <button
              onClick={handleAlert}
              className=" absolute  top-0.5  text-base right-0.5 border-black border-solid  rounded-2xl w-6 bg-black text-white"
            >
              X
            </button>
          </span>
        </>
      )}
      
      <List todo={todo} setTodo={setTodo} />
     
    </div>
  );
};

export default TodoList;
