import axios from "axios";

import { createSlice, createAsyncThunk} from  "@reduxjs/toolkit";

export const todoThunk = createAsyncThunk('/todo',async (thunkApi)=>{
    try {
        const res = await axios.get("http://localhost:3002");
        return res.data
      } catch (error) {
        console.log("error while fetching the data", error);
      }
})

const todoSlice = createSlice({
    name:"todos",
    initialState:[],
    reducers:{
        addTodo:(state, payload)=>{
          state.push({_id:payload.payload._id, todoName:payload.payload.todoName})
        },
        allTodos:(state,payload)=>{

        },
        deleteTodo:(state,payload)=>{
            console.log(state, payload.payload);
            // state.push(payload.payload.data)
            let newState = state.filter((val) => val._id !==  payload.payload);
            return newState;
        },
        updateTodo:(state,payload)=>{

        }
    },
    extraReducers:(builder)=>{
        builder.addCase(todoThunk.fulfilled,(state, action )=>{

        //    state = action.payload;
        console.log(action.payload)
        return [...state, ...action.payload];
        }).addCase(todoThunk.pending,(state,action)=>{
            console.log(state,action,"==========>>>>> pending")
        }).addCase(todoThunk.rejected,(state,action)=>{
            console.log(state,action,"====?>>>>>>>>>>>>> rejected")
        })
    }
})

export const {addTodo, deleteTodo,updateTodo,allTodos} = todoSlice.actions;
export default todoSlice.reducer;