import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../config/firebase";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../Component/Navbar";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (email == "" || password == "") {
      toast.error("Email and Password should not be empty");
    }

    const auth = getAuth();
    const res = await signInWithEmailAndPassword(auth, email, password);
    if (res) {
      // save the user to localStorage
      localStorage.setItem("user", JSON.stringify(res.user));
      return navigate("/");
    }
    try {
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <ToastContainer />
      <form onSubmit={onSubmit}>
        <div className="container">
          <div className="mt-3">
            <label htmlFor="email">email</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="form-control"
            />
          </div>
          <div className="mt-3">
            <label htmlFor="password">password</label>
            <input
              type="password"
              onChange={handlePasswordChange}
              value={password}
              className="form-control"
            />
          </div>
          <div className="mt-3">
            <input
              type="submit"
              value="Sign In"
              className="btn btn-primary w-100"
            />
          </div>
          <p className="text-center">
            Dont Have an Account?{" "}
            <span className="ml-2 mt-2">
              <Link to="/register">Register</Link>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
