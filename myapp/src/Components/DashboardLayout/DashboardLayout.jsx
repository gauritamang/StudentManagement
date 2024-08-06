import React, { Children } from "react";
import './DashboardLayout.css'
import { NavLink, Link } from "react-router-dom";

function DashboardLayout({children}) {
  return (
    <div>
        <div className="row">

          {/* sidebar  col*/}
          <div className="col col-sm-2 ">
            <div
              className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary  sidebar-body"
              bis_skin_checked="1"
            >
              <a
                href="/"
                className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
              >
                <span className="fs-4">Sidebar</span>
              </a>
              <hr />
              <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                  <NavLink to="/dashboard" className="nav-link" aria-current="page">
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/addstudent"
                    className="nav-link link-body-emphasis"
                  >
                    Add student
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/studentlist"
                    className="nav-link link-body-emphasis"
                  >
                    student list
                  </NavLink>
                </li>
                <li>
                  <NavLink  to='/addcourse'
                  className="nav-link link-body-emphasis"
                  >
                  Add Course
                  </NavLink>

                </li>
                <li>
                  <NavLink  to='/courselist'
                  className="nav-link link-body-emphasis"
                  >
                  course List 
                  </NavLink>
                </li>

                <li>
                  <NavLink to='/payment' 
                  className="nav-link link-body-emphasis">
                    payment
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>

         {/* clildren  col */}
          <div className="col col-sm-10 children-col">
            <div className="child-container">
             <div className="child-body">
              {children}
             </div>
            </div>
          </div>

        </div>
      </div>
  );
}

export default DashboardLayout;
