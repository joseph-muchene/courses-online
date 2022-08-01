import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [user, setuser] = useState();

  useEffect(() => {
    let userItem = localStorage.getItem("user");
    setuser(JSON.parse(userItem));
  }, []);
  console.log(user);
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand text-secondary" to="/">
            Somi
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="fa-solid fa-bars text-black"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <>
                {user !== null ? (
                  <>
                    <Link className="nav-link active text-black" to="/">
                      Home
                    </Link>
                    <Link className="nav-link text-black " to="">
                      About
                    </Link>
                    <Link className="nav-link text-black " to="/dashboard">
                      dashboard
                    </Link>
                  </>
                ) : (
                  <>
                    <Link className="nav-link text-black" to="/register">
                      Register
                    </Link>
                    <Link className="nav-link text-black" to="/login">
                      Login
                    </Link>
                  </>
                )}
              </>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
