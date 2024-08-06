import React, { useEffect, useState } from 'react'
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import { useDispatch, useSelector } from 'react-redux'
import { add_payment_list } from '../../Store/Slice/StAndCourse'
import { Link } from 'react-router-dom'

function Payment() {
  const studentInfo = useSelector(state => state.studentInfo)// studentInformation form reactStore
  const course = useSelector(state => state.course) // course List form reactStoe 
  const StAndCourse = useSelector(state => state.StAndCourse)  // used to  for map this value is not set currently but it will be set after submit adn it will be render 
  const dispatch = useDispatch()

  // sync to search input field 
  const [searchQuery, setSearchQuery] = useState('')
  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  useEffect(() => {
    if (searchQuery) {
      const filteredStudentList = studentInfo.filter((item) => // we filter the student information and what we type in the search box  if that match the student name then return that student obj and now filter retur new array  so wwhatever we type in search if name match then it wil  be store in this 
        item.fullName.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // in filterStudentList there will be the array of student who have matched that name that search on the input box it can be one array of obj or can be two or more array of obj if name is same 
      if (filteredStudentList.length > 0) {
        const updatedStudentList = filteredStudentList.map((std) => {
          // if (std.course) it means it si courseId i have named confusing sorry 
          if (std.course) {  // some student do not have assign the course so we do this if condi if ther si course then merge 
            // adn this course is courseList sorry i have named it confusing 
            const cmatch = course.find((eachCourse) => eachCourse.id == std.course);
            return cmatch ? { ...std, courseDetails: cmatch } : std;   // it will return new obj along with appending that courseDetails so if 
          }
          return std;
        });
        console.log('this is merge course and student',updatedStudentList)
        dispatch(add_payment_list(updatedStudentList))
      } else {
        dispatch(add_payment_list([]))
      }

    } else {
      dispatch(add_payment_list([]))
    }
  }, [searchQuery, studentInfo, course, dispatch]);

  // so at the end when we type something on search box if name match the it  filter studentinformation adn if match tehn rertrun that array and if that array contain course then we append course detials else we ret aasitise so  this updatedList student can be with courseDeails or cannot be withCourseDeatisl and remember what we type in the search box only that martch array wil be stored in this if we do back means if we empty searchlist then it will also empty 

  const searchListData = StAndCourse.map((item, idx) => (
    <tr key={item.id || idx}>
      <td>{idx + 1}</td>
      <td>{item.fullName}</td>
      <td>{item.phone}</td>
      <td>{item.enrollDate}</td>
      <td>{item.courseDetails?.courseCode || 'N/A'}</td>
      <td>{item.courseDetails?.courseName || 'N/A'}</td>
      <td>{item.courseDetails?.courseFee || 'N/A'}</td>
      <td>
        {item.id ? (
          <Link className='btn btn-info' to={`/paymentinput/${item.id}`}>pay</Link>
        ) : (
          <span>No ID available</span>
        )}
      </td>
    </tr>
  ))

  return (
    <DashboardLayout>
      <div className="input-group">
        <input
          type="text"
          name='searchQuery'
          id='search'
          value={searchQuery}
          onChange={handleSearch}
          placeholder='Search for payment'
          className='form-control'
        />
        <button className='btn btn-outline-secondary' type='button' onClick={() => setSearchQuery('')}>clear</button>
      </div>

      <table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>phone</th>
            <th>enrollDate</th>
            <th>course Code</th>
            <th>course Name</th>
            <th>course Fee</th>
            <th>pay</th>
          </tr>
        </thead>
        <tbody>
          {searchListData}
        </tbody>
      </table>
    </DashboardLayout>
  )
}

export default Payment