import { createSlice } from "@reduxjs/toolkit";

const loadInitialState = () => {
  const storedState = localStorage.getItem('student');
  return storedState ?   JSON.parse(storedState) : [];
};

const updateLocalStorage = (state) => {
  localStorage.setItem('student', JSON.stringify(state));
};

const studentInformation = createSlice({
    name: 'stuInfo',
    initialState: loadInitialState(),
    reducers: {
        add_student(state, action) {
            state.push(action.payload);
            updateLocalStorage(state);
        },
        update_student(state, action) {
            const index = state.findIndex(student => student.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
                updateLocalStorage(state);
            }
        },
        delete_student(state, action) {
            const afterDel = state.filter(student => student.id !== action.payload);
            updateLocalStorage(afterDel);
            return afterDel;
        },
    }
});

export default studentInformation.reducer;
export const { add_student, delete_student, update_student } = studentInformation.actions;


