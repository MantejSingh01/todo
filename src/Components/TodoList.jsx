import React, { useState } from 'react';
import List from './List';
import ParticleBg from '../particleBg';

const TodoList = () => {
    const [text, setText]= useState('')
    const [todo, setTodo] = useState([])
    const [showAlert, setShowAlert] = useState(false)

    const handleText=(e)=>{
        let searchedString = e.target.value;
        setText(searchedString)

    }
    const handleClick=()=>{
        if(text.length>0){
            setTodo((p)=>[...p,text])
            console.log("clickd");
            setText('')
        }else{
            setShowAlert(true)
        }
       
    }

    const handleAlert =()=>{
        setShowAlert(!showAlert)
    }
    return (
        <div className='p-10 flex  pt-10 items-center bg-black h-full flex-col relative z-10'>
     <ParticleBg></ParticleBg>
            <input className=' rounded-md border-white border-solid border-2 p-2 mb-2 w-3/12' placeholder='enter todo' value={text} onChange={handleText}/>
            <button className=' border border-white border-solid mx-2 p-2 rounded-md w-3/12  bg-black text-white' onClick={handleClick}>Add Todo</button>
            {showAlert && <><span className=' text-3xl text-black bg-white p-6 m-2 relative rounded-md'> Please fill input box first<button onClick={handleAlert} className=' absolute  top-0.5  text-base right-0.5 border-black border-solid  rounded-2xl w-6 bg-black text-white'>X</button></span></>}
            <List todo={todo} setTodo={setTodo} />
        </div>
    );
};

export default TodoList;