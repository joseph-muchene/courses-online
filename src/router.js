import React, { useEffect, useState } from "react";
import { BrowserRouter as Routing, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./Pages/Login";
import Course from "./Pages/Course";
import Register from "./Pages/Register";
import DashBoard from "./Pages/Dashboard";
import Profile from "./Pages/Profile";
import CreateCourse from "./Pages/CreateCourse";

import { auth } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";
function Router() {
  const [user, setuser] = useState();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setuser(user);
      }
    });
  });

  return (
    <>
      <Routing>
        {/* <Navbar /> */}

        <Routes>
          <Route path="/" element={<App />} />
          <Route
            path="/dashboard"
            element={user ? <DashBoard /> : "you are not registered"}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/course/:id" element={<Course />} />
          <Route
            path="/profile"
            element={user ? <Profile /> : "you are not registered"}
          />
          <Route
            path="/create/course"
            element={user ? <CreateCourse /> : "you are not registered"}
          />
        </Routes>
      </Routing>
    </>
  );
}

export default Router;
