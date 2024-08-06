import React, { useEffect, useState } from "react";
import DashboardLayout from "../../Components/DashboardLayout/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { add_course, update_course } from "../../Store/Slice/CourseSlice";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useParams } from "react-router-dom";

function AddCourse() {
  const [courseData, setCourseData] = useState({
    courseName: "",
    courseCode: "",
    credits: "",
    courseFee: "",
  });

  
  const handleInput = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const courseList = useSelector((state) => state.course);

  useEffect(() => {
    if (id) {
      const courseToEdit = courseList.find((course) => course.id === id);
      if (courseToEdit) {
        setCourseData(courseToEdit);
      }
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataFormat = {
      id: id || uuidv4(),
      courseName: courseData.courseName,
      courseCode: courseData.courseCode,
      credits: Number(courseData.credits),
      courseFee: Number(courseData.courseFee),
    };

    if (id) {
    // in update it will update this object in that array this particular obj will  insert in that existing index only other remains same 
      dispatch(update_course(dataFormat));
      navigate("/courselist");
    } else {
      dispatch(add_course(dataFormat));  // incase of addcourse  it will add/append/push in the last of the array 
      navigate("/courselist");
    }

    setCourseData({
      courseName: "",
      courseCode: "",
      credits: "",
      courseFee: "",
    });
  };

  return (
    <DashboardLayout>
      <h1>{id ? "edit course " : "Add course "} </h1>
      <form action="" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col col-md-12 mt-4">
            <div className="form-floating">
              <input
                type="text"
                name="courseCode"
                id="courseCode"
                placeholder=""
                className="form-control"
                value={courseData.courseCode}
                onChange={handleInput}
              />
              <label htmlFor="courseCode"> courseCode</label>
            </div>
          </div>

          <div className="col-md-6 mt-4">
            <div className="form-floating">
              <input
                type="text"
                name="courseName"
                id="courseName"
                placeholder="courseName"
                className="form-control"
                value={courseData.courseName}
                onChange={handleInput}
              />
              <label htmlFor="courseName">courseName</label>
            </div>
          </div>

          <div className="col-md-6 mt-4">
            <div className="form-floating">
              <input
                type="number"
                name="credits"
                id="credits"
                placeholder="credits"
                className="form-control"
                value={courseData.credits}
                onChange={handleInput}
              />
              <label htmlFor="credits">credits</label>
            </div>
          </div>

          <div className="col-md-12 mt-4">
            <div className="form-floating">
              <input
                type="number"
                name="courseFee"
                id="courseFee"
                placeholder="courseFee"
                className="form-control"
                value={courseData.courseFee}
                onChange={handleInput}
              />
              <label htmlFor="courseFee">courseFee</label>
            </div>
          </div>

          <div className="col-md-6 mt-4 m-auto">
            <input
              type="submit"
              className="form-control bg-info"
              value={id ? "update" : "Submit"}
            />
          </div>
        </div>
      </form>
    </DashboardLayout>
  );
}

export default AddCourse;
