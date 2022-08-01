import React, { useEffect, useState } from "react";
import Video from "../Component/Video";
import "../App.css";
import ReactStars from "react-rating-stars-component";
import { getDocs, collection, doc, updateDoc } from "firebase/firestore";
import Navbar from "../Component/Navbar";
import { Link, useParams } from "react-router-dom";
import { auth, db } from "../config/firebase";
import { toast, ToastContainer } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";
function Course() {
  const url = useParams();
  const courseId = url.id;

  const [course, setCourse] = useState([]);
  const [photo, photoURL] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        photoURL(user.photoURL);
      }
    });
  });

  useEffect(() => {
    const fetchData = async () => {
      const courses = await getDocs(collection(db, "courses"));

      const courseItem = [];
      const course = courses.forEach((course) =>
        courseItem.push({ id: course.id, ...course.data() })
      );
      // console.log(courseItem);
      let c = courseItem.filter((course) => course.courseId === courseId);
      setCourse(c);
    };
    fetchData();
  }, [courseId]);

  // rating
  const ratingChanged = async (newRating) => {
    toast.success("Ratind added!");
    try {
      const docRef = doc(db, "courses", courseId);

      await updateDoc(docRef, {
        Rating: newRating,
      });
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="container mt-3">
        {course.map((course) => {
          return (
            <>
              <div className="row">
                <div className="col-md-4">
                  <Video videoUrl={course.videoUrl} />
                </div>

                <div className="col-md-8 ">
                  <h1 className="text-center">{course.title}</h1>
                  <p className="text-center">{course.description}</p>
                </div>
              </div>
            </>
          );
        })}
        <div>
          <div className="row">
            <div className="col-md-6 border border-primary p-2">
              <h3 className="text-center">Rate course</h3>
              <div className="d-flex justify-content-center">
                <ReactStars
                  count={5}
                  onChange={ratingChanged}
                  size={24}
                  activeColor="#ffd700"
                />
              </div>
            </div>
            <div className="col-md-6">
              <h5 className="text-center text-success ">
                <Link
                  to="/"
                  className="text-decoration-none text-danger text-center"
                >
                  {photo !== "" ? (
                    <img
                      src={photo}
                      style={{ height: "26vh" }}
                      className="rounded img-fluid"
                    />
                  ) : (
                    <img
                      src="https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_1280.png"
                      style={{ height: "26vh" }}
                      className="rounded img-thumbnail"
                    />
                  )}
                </Link>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Course;
