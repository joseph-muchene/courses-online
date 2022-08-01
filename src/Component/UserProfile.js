import React, { useEffect, useState } from "react";
import {
  doc,
  setDoc,
  collection,
  getDoc,
  where,
  query,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";

function UserProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState([]);
  console.log(user);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUserId(user.uid);
    });
  }, []);

  // category: "student";
  // email: "mandy@gmail.com";
  // name: "mandy";
  // phone: "84397493";
  // userId: "xIEIfICFRPVkSRGDs4Qt2upIHFq1";

  useEffect(() => {
    const getDocument = async () => {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());

        setName(docSnap.data().name);
        setEmail(docSnap.data().email);
        setAbout(docSnap.data().about);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    getDocument();
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleAboutChange = (e) => {
    setAbout(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const docRef = doc(db, "users", userId);

      const data = {
        name,
        email,
        about,
      };

      setDoc(docRef, data, { merge: true })
        .then(() => {
          toast.success("document was updated");
        })
        .catch((err) => {
          toast.error(err.message);
        });
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div>
      <ToastContainer />
      <form className="mt-5" onSubmit={handleSubmit}>
        <div className="mt-3">
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            name="name"
            className="form-control"
          />
        </div>
        <div className="mt-3">
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleEmailChange}
            className="form-control"
          />
        </div>
        <div className="mt-3">
          <input
            type="text"
            value={about}
            onChange={handleAboutChange}
            name="about"
            id=""
            className="form-control"
          />
        </div>
        <div className="mt-3">
          <input type="submit" className="btn btn-primary" value="save" />
        </div>
      </form>
    </div>
  );
}

export default UserProfile;
