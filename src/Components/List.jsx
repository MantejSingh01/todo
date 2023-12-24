import React from "react";

const List = (props) => {
  const { todo, setTodo } = props;

  const handleClose = (index) => {
   let updatedTodo = todo.filter((val,ind)=> ind !== index)
    setTodo(updatedTodo);
  };
  return (
    <div className={`bg-white w-3/12  items-start flex-col p-3 m-2 rounded ${!todo.length>0?' hidden':'flex'}`}>
      {todo.length > 0
        ? todo.map((item, ind) => (
            <ol className=" border-white border-solid rounded-md  p-1 border-2 w-full flex items-start my-1 text-md justify-between bg-black text-white" key={item + ind} >
              {item}
              <button onClick={()=>handleClose(ind)}>X</button>
            </ol>
          ))
        : null}
    </div>
  );
};

export default List;
