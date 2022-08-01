import React, { useState } from "react";
import { db } from "../config/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function RegisterForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();

    // check if all fields are set
    if (
      email == "" ||
      password == "" ||
      phone == "" ||
      category == "" ||
      name == ""
    ) {
      return toast.error("All fields should be set");
    }

    const auth = getAuth();
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // save the user to localStorage
      localStorage.setItem("user", JSON.stringify(userCredentials.user));

      setDoc(doc(db, "users", userCredentials.user.uid), {
        name,
        email,
        phone,
        category,
        userId: userCredentials.user.uid,
      })
        .then((data) => {
          console.log(data);
          navigate("/");
        })
        .catch((err) => toast.error(err));
    } catch (error) {
      toast.error(error.message.slice(9));
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const categoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div>
      <ToastContainer />
      <form onSubmit={onSubmit}>
        <div className="mt-3">
          <label htmlFor="name">name</label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            className="form-control"
          />
        </div>
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
          <label htmlFor="email">phone Number</label>
          <input
            type="phone"
            value={phone}
            onChange={handlePhoneChange}
            className="form-control"
          />
        </div>
        <div className="mt-3">
          <label htmlFor="category">Category</label>
          <select
            class="form-select"
            aria-label="Default select example"
            value={category}
            name="category"
            onChange={categoryChange}
          >
            <option selected>Sign up as a:</option>
            <option value="student">student</option>
            <option value="teacher">instructor</option>
          </select>
        </div>
        <div className="mt-3">
          <label htmlFor="password">password</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="form-control"
          />
        </div>
        <div className="mt-3">
          <input
            type="submit"
            value="Register"
            className="btn btn-primary w-100"
          />
        </div>

        <p className="text-center">
          Already Have an Account?{" "}
          <span className="ml-2 mt-2">
            <Link to="/login">login</Link>
          </span>
        </p>
      </form>
    </div>
  );
}

export default RegisterForm;
