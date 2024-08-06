import React, { useState } from "react";
import DashboardLayout from "../../Components/DashboardLayout/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { delete_student } from "../../Store/Slice/studentInformationSlice";
import { Link } from "react-router-dom";

function StudentList() {
  const [searchQuery, setSearchQuery] = useState("");

  // we fetch the student information from redux and now we can  render here by using  map  and in that  list there will be delete edit option and when we edit should linked to addStudent with that pparticular studeent id 
  const studentList = useSelector((state) => state.studentInfo);
  // we need dispatch to delete 
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };


  const filteredStudentList = studentList.filter((item) =>
    // Object.values(item).some((value) =>
    //   value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    // )
    // searchQuery !=="" && item.fullName.toLowerCase().includes(searchQuery.toLowerCase())
     item.fullName.toLowerCase().includes(searchQuery.toLowerCase())

  );
  console.log("this is filterd student ",filteredStudentList)

 const tableBody= filteredStudentList.length > 0 ? (filteredStudentList.map((item, index) => (
  <tr key={item.id}>
    <td>{index + 1}</td>
    <td>{item.fullName}</td>
    <td>{item.phone}</td>
    <td>{item.email}</td>
    <td>{item.address}</td>
    <td>{item.enrollDate}</td>
    <td>{item.gender}</td>
    <td>
      <button className="btn btn-info" onClick={() => dispatch(delete_student(item.id))}>
        Remove
      </button>
      <Link to={`/addstudent/${item.id}`} className="btn btn-info">
        Edit
      </Link>
    </td>
  </tr>
))):(<tr>
    <td colSpan='8' className="text-center">
      data not found 
    </td>
  </tr>)
   


  return (
    <DashboardLayout>
      <h1>Student Table</h1>
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={handleSearch}
        className="form-control"
      />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th>Enrollment Date</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{tableBody}</tbody>
      </table>
    </DashboardLayout>
  );
}

export default StudentList;

