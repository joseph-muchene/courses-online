import React, { useState } from "react";
import Navbar from "../Component/Navbar";
import Photo from "../Component/Photo";
import UserAccount from "../Component/UserAccount";
import UserProfile from "../Component/UserProfile";

function Profile() {
  const [photo, setPhotoClick] = useState(false);
  const [profile, setShowProfile] = useState(true);
  const [account, setAccount] = useState(false);

  const photoClick = () => {
    setAccount(false);
    setPhotoClick(true);
    setShowProfile(false);
  };
  const profileClick = () => {
    setAccount(false);
    setPhotoClick(false);
    setShowProfile(true);
  };
  const accountClick = () => {
    setAccount(true);
    setPhotoClick(false);
    setShowProfile(false);
  };
  return (
    <div>
      <Navbar />
      <div className="mb-5">
        {" "}
        <h1 className="text-center">Public Profile</h1>
        <p className="text-center">Add Information about yourself</p>
      </div>
      <div className="contaner">
        <div className="row">
          <div className="col-md-3">
            <div className="  mx-3 shadow-md" style={{ width: "18rem" }}>
              {/* <img
                className=" img-thumbnail rounded-circle "
                src="https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?b=1&k=20&m=476085198&s=612x612&w=0&h=Ov2YWXw93vRJNKFtkoFjnVzjy_22VcLLXZIcAO25As4="
                alt="Card cap"
              /> */}
              <div className="card-body">
                <h5 className="card-title">John Doe</h5>
                {/* <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p> */}
                <div className="list-group mb-2">
                  <li className="list-group-item my-2" onClick={profileClick}>
                    Profile
                  </li>
                  <li className="list-group-item my-2" onClick={photoClick}>
                    Photo
                  </li>
                  <li className="list-group-item my-2" onClick={accountClick}>
                    Account Security
                  </li>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            {photo && <Photo />}

            {profile ? <UserProfile /> : ""}
            {account ? <UserAccount /> : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
