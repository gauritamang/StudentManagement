import { createSlice } from "@reduxjs/toolkit";

const loadInitialState=()=>{
    const storedState=localStorage.getItem('course');
    return storedState ? JSON.parse(storedState) : []
}


const updateLocalStorage = (state) => {
    localStorage.setItem('course', JSON.stringify(state));
  };

  const courseSlice=createSlice({
    name:'course',
    initialState:loadInitialState(),
    reducers:{
        add_course(state,action){
            state.push(action.payload);
            updateLocalStorage(state);
        },
        update_course(state,action){
            const index = state.findIndex(student => student.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
                updateLocalStorage(state);
            }
        },
        delete_course(state, action) {
            const afterDel = state.filter(student => student.id !== action.payload);
            updateLocalStorage(afterDel);
            return afterDel;
        },

    }
  })

  export default courseSlice.reducer;
  export const {add_course,delete_course,update_course}=courseSlice.actions