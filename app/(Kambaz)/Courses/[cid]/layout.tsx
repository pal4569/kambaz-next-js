"use client";
import { ReactNode, useState } from "react";
import CourseNavigation from "./Navigation";
import { useParams } from "next/navigation";
import { FaAlignJustify } from "react-icons/fa6";
import Course from "../../Models/Course"
import { useAppSelector } from "../../hooks";

export default function CoursesLayout({ children }: { children: ReactNode }) {
 const { cid } = useParams();
 const { courses } = useAppSelector((state) => state.coursesReducer);
 const course = courses.find((course: Course) => course._id === cid);
 const [showNav, setShowNav] = useState(true);
 const toggleSidebar = () => setShowNav((prev) => !prev);
 
 return (
   <div id="wd-courses">
     <h2>
       <FaAlignJustify 
        className="me-4 fs-4 mb-1"
        onClick={toggleSidebar}
        style={{ cursor: "pointer" }} />
       {course?.name}
     </h2>
     <hr />
     <div className="d-flex">
       <div>
          {showNav && (
            <div className="pe-3">
              <CourseNavigation />
            </div>
          )}
       </div>
       <div className="flex-fill">{children}</div>
     </div>
   </div>
 );
}
