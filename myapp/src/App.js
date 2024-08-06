import {Routes,Route} from 'react-router-dom'
import Login from './Pages/Login/Login'
import AddStudent from './Pages/addStudent/AddStudent';
import Navbars from './Components/Navbars/Navbars';
import StudentList from './Pages/studentList/StudentList';
import Dashboard from './Components/Dashboard/Dashboard';
import AddCourse from './Pages/AddCourse/AddCourse';
import CourseList from './Pages/CourseList/CourseList';
import Payment from './Components/Payment/Payment';
import PaymentInput from './Components/PaymentInput/PaymentInput';
function App() {
  return (
   <>
   <Navbars/>
   <Routes>
    <Route path='/' element={<Login/>}/>
    <Route path='/addstudent' element={<AddStudent/>}/>
    <Route path='/addstudent/:id' element={<AddStudent/>}/>
    <Route path='/studentlist' element={<StudentList/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/addcourse' element={<AddCourse/>}/>
    <Route path='/courselist' element={<CourseList/>}/>
    <Route path='/addcourse/:id' element={<AddCourse/>}/>
    <Route path='/payment'  element={<Payment/>} />
    <Route path='/paymentinput/:id' element={<PaymentInput/>}/>
   </Routes>
   
   </>

  );
}

export default App;
