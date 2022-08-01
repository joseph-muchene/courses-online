import React, { useEffect, useState } from "react";
import Course from "./Course";
import { db } from "../config/firebase";
import Loading from "../Component/Loading";
import { collection, getDocs } from "firebase/firestore";
function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  // fetch on render
  useEffect(() => {
    // fetch the courses
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "courses"));
      let courseItem = [];
      querySnapshot.forEach((doc) => {
        courseItem.push({ id: doc.id, ...doc.data() });
        setCourses([...courseItem]);
      });
    };

    fetchData();
    setLoading(!loading);
  }, []);

  return (
    <div className="row">
      {courses.map((course) => {
        return (
          <div className="col-md-4">
            <Course course={course} />
          </div>
        );
      })}
    </div>
  );
}

export default Courses;
