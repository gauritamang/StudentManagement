import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "../../Components/DashboardLayout/DashboardLayout";
import { delete_course } from "../../Store/Slice/CourseSlice";
import { Link } from "react-router-dom";

function CourseList() {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const courseList = useSelector((state) => state.course);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleRemove = (id) => {
    dispatch(delete_course(id));
  };

  const filteredCourseList = courseList.filter((item) =>
    item.courseName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tableBody =
    filteredCourseList.length > 0 ? (
      filteredCourseList.map((item, index) => (
        <tr key={item.id}>
          <td>{index + 1}</td>
          <td>{item.courseName}</td>
          <td>{item.courseCode}</td>
          <td>{item.credits}</td>
          <td>{item.courseFee}</td>
          <td>
            <button
              className="btn btn-info me-4"
              onClick={() => handleRemove(item.id)}
            >
              Remove
            </button>
            <Link to={`/addcourse/${item.id}`} className="btn btn-info">
              Edit
            </Link>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="8" className="text-center">
          data not found
        </td>
      </tr>
    );

  return (
    <DashboardLayout>
      <h1>course List </h1>
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
            <th>course Name</th>
            <th>course Code </th>
            <th>credits</th>
            <th>course Fee</th>
            <th>edit</th>
          </tr>
        </thead>
        <tbody>{tableBody}</tbody>
      </table>
    </DashboardLayout>
  );
}

export default CourseList;
