import { createSlice } from "@reduxjs/toolkit";
 const todoSlice2=createSlice({
    name:"profile",
    initialState:{
        title:"",
        todos: [],
        userData:{},
    
    },
    reducers:{
        setTitle:(state,action)=>{
         state.title=action.payload;
        },
        setTodos:(state,action)=>{
            state.todos=action.payload;
        },
        setUserData:(state,{payload})=>{
          state.userData=payload;
        }
    }
 });
 export const{setTitle,setTodos,setUserData}=todoSlice2.actions;
 export default todoSlice2.reducer;