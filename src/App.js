import Courses from "./Component/Courses";
import Navbar from "./Component/Navbar";
import { db } from "./config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
function App() {
  const [size, setSize] = useState(0);
  useEffect(() => {
    // fetch the courses
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "courses"));
      let courseItem = [];
      querySnapshot.forEach((doc) => {
        courseItem.push({ ...doc.data() });
      });

      setSize(courseItem.length);
    };

    fetchData();
  });

  return (
    <>
      <Navbar />
      <div className="container mt-3 w-97">
        <h1 className="display-3 mt-3">Do you want to Learn a new Language?</h1>
        <p className="text-center ">somi is for you</p>

        <div className="container mt-4">
          <h1 className="text-center my-3 h3">
            {size < 2 ? "There is" : "There are"} {size} free online{" "}
            {size < 2 ? "course" : "courses"}
          </h1>
          <hr />
          <Courses />
        </div>
      </div>
    </>
  );
}

export default App;
