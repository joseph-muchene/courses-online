import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import "./Course.css";
import Rating from "./Rating";
import { db } from "../config/firebase";
function Course({ course }) {
  const [user, setUser] = useState([]);

  //  get all courses

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    let users = [];
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
      //  find the user

      const user = users.filter((user) => user.id === course.InstructorId);

      setUser([...user]);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="card my-3 mx-3 shadow-md" style={{ width: "18rem" }}>
        <img className="card-img-top" src={course.thumbnail} alt="Card cap" />
        <div className="card-body">
          <h5 className="card-title">{course.title}</h5>
          {/* <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p> */}
          <div className="list-group mb-2">
            <li className="list-group-item my-2">Rating: {course.Rating}</li>
            {user.map((n) => (
              <li className="list-group-item my-2">
                Instructor: <span className="text-success ml-2">{n.name}</span>
              </li>
            ))}
            <li className="list-group-item my-2">
              Length: <span className="text-success ml-2">{course.length}</span>
            </li>
          </div>
          <Link
            to={`/course/${course.courseId}`}
            className="btn btn-info w-100"
          >
            view course
          </Link>

          <Rating rating={course.Rating} />
        </div>
      </div>
    </div>
  );
}

export default Course;
