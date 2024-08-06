import {createSlice} from '@reduxjs/toolkit'
const loginSlice=createSlice({
    name:'login',
    initialState:{
        email:'abc@gmail.com',
        password:'@bc123'
    },
    reducers:{}
})
export default loginSlice.reducer