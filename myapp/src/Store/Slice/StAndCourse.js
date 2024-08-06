import { createSlice } from "@reduxjs/toolkit";

const loadInitialState=()=>{
    const storedState=localStorage.getItem('StAndCourse');
    return storedState ? JSON.parse(storedState) : []
}

const updateLocalStorage=(state)=>{
    localStorage.setItem('StAndCourse',JSON.stringify(state));
}

const StAndCourse=createSlice({
    name:'stAndCourse',
    initialState:loadInitialState(),
    reducers:{
        add_payment_list(state,action){
            updateLocalStorage(action.payload)
            return action.payload
        }
    }
})

export default StAndCourse.reducer;
export const {add_payment_list}=StAndCourse.actions;
