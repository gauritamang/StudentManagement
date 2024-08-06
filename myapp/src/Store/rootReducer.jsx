import { configureStore } from "@reduxjs/toolkit";
import loginReducer from './loginSlice'
import studentInformationReducer from './Slice/studentInformationSlice'
import courseReducer from './Slice/CourseSlice'
import StAndCourseReducer from './Slice/StAndCourse'

const store=configureStore({
    reducer:{
        loginData:loginReducer,
        studentInfo:studentInformationReducer,
        course:courseReducer,
        StAndCourse:StAndCourseReducer
    }
})
export default store ;