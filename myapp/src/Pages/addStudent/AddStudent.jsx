import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import DashboardLayout from "../../Components/DashboardLayout/DashboardLayout";
import { add_student, update_student } from "../../Store/Slice/studentInformationSlice";

function AddStudent() {
  const navigate=useNavigate()
  const [userData, setUserData] = useState({
    fullName: "",
    phone: '',
    email: '',
    address: '',
    enrollDate: '',
    gender: ''
  });

  //  imagine insstantly  useSelector means it is  came form redux  storage 
  const courseList=useSelector(state=>state.course)
  
  const handleChanges = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const { id } = useParams();
  const dispatch = useDispatch();
  const studentInfo = useSelector(state => state.studentInfo);

  useEffect(() => {
    if (id) {
      const studentToEdit = studentInfo.find(student => student.id === id);
      if (studentToEdit) {
        setUserData(studentToEdit);
      }
    }
  }, [id]);

  const [selectedCourse,setSelectedCourse]=useState()
  const handleCourse=(e)=>{
    setSelectedCourse(e.target.value)
  }
  console.log("thi sis selected course ",selectedCourse)

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataFormat = {
      id: id || uuidv4(),
      fullName: userData.fullName,
      phone: Number(userData.phone),
      email: userData.email,
      address: userData.address,
      enrollDate: userData.enrollDate,
      gender: userData.gender,
      course:selectedCourse
    };

    if (id) {
      console.log("this is id ",id)
      dispatch(update_student(dataFormat));
      navigate("/studentlist")      
       
    } else {
      dispatch(add_student(dataFormat));
      navigate("/studentlist")      
    }

    // Reset form
    setUserData({
      fullName: "",
      phone: '',
      email: '',
      address: '',
      enrollDate: '',
      gender: ''
    });
  };


  return (
    <DashboardLayout>
      <h1>{id ? 'Edit Student' : 'Add Student'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">

          <div className="col-md-12 mt-4">
            <div className="form-floating">
              <input
                type="text"
                name="fullName"
                id="name"
                placeholder="Full Name"
                className="form-control"
                onChange={handleChanges}
                value={userData.fullName}
              />
              <label htmlFor="name">Full Name</label>
            </div>
          </div>

          <div className="col-md-6 mt-4">
            <div className="form-floating">
              <input
                type="phone"
                name="phone"
                id="phone"
                placeholder="phone"
                className="form-control"
                onChange={handleChanges}
                value={userData.phone}
              />
              <label htmlFor="phone">Phone</label>
            </div>
          </div>

          <div className="col-md-6 mt-4">
            <div className="form-floating">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="email"
                className="form-control"
                onChange={handleChanges}
                value={userData.email}
              />
              <label htmlFor="email">Email</label>
            </div>
          </div>

          <div className="col-md-6 mt-4">
            <div className="form-floating">
              <input
                type="text"
                name="address"
                id="address"
                placeholder="address"
                className="form-control"
                onChange={handleChanges}
                value={userData.address}
              />
              <label htmlFor="address">Address</label>
            </div>
          </div>

          <div className="col-md-6 mt-4">
            <div className="form-floating">
              <input
                type="date"
                className="form-control"
                name="enrollDate"
                id="enrollDate"
                placeholder="enrollment date"
                onChange={handleChanges}
                value={userData.enrollDate}
              />
              <label htmlFor="enrollDate">Enrollment Date</label>
            </div>
          </div>

          <div className="col-md-6 mt-4">
            <div className="form-group">
              <label htmlFor="gender">Gender : </label>

              <div className="form-check form-check-inline">
                <label htmlFor="male" className="form-check-label">
                  Male
                </label>
                <input
                  type="radio"
                  name="gender"
                  id="male"
                  value="male"
                  className="form-check-input"
                  onChange={handleChanges}
                  checked={userData.gender === "male"}
                />
              </div>

              <div className="form-check form-check-inline">
                <label htmlFor="female" className="form-check-label">
                  Female
                </label>
                <input
                  type="radio"
                  name="gender"
                  id="female"
                  value="female"
                  className="form-check-input"
                  onChange={handleChanges}
                  checked={userData.gender === "female"}
                />
              </div>

              <div className="form-check form-check-inline">
                <label htmlFor="other" className="form-check-label">
                  Others
                </label>
                <input
                  type="radio"
                  name="gender"
                  id="other"
                  value="other"
                  className="form-check-input"
                  onChange={handleChanges}
                  checked={userData.gender === "other"}
                />
              </div>
            </div>
          </div>

           {/* here in this select section we handle this section change seperately because this course is not fixed it means if we  add the course in course page then only it exist otherwise it wil not exist so we handle this seperately instead of handling in  handleChange function and another reason is in handle change we group that email name phone etc because it  is from same category like user will input that value from thsi page and it its value is kind of like similar like they have e.target.value they all target the value for eg image target files like in this case we can separate so  we separate and we append it when  we submit and ther   after submit button click we so e.preventdefault so in that time we make one allthe combination of data bueprint of data that need to be stored in the databae and we store that in database */}
          <div className="col-md-6 mt-4">
           {
            courseList && courseList.length>0 && 
            <select name="" id="" className="form-select" onChange={handleCourse}>  
              <option value="">select a course </option>
              {
                courseList && 
                courseList.map((course,idx)=>
            
                    <option value={course.id} key={idx}>{course.courseName}</option>
          
                )
              }
            </select>
           }
          </div>

          <div className="col-md-6 mt-4 m-auto">
            <input
              type="submit"
              value={id ? 'Update' : 'Submit'}
              className="form-control bg-info"
            />
          </div>
         
        </div>
      </form>



    </DashboardLayout>
  );
}

export default AddStudent;