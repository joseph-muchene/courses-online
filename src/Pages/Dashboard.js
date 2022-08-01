import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AppHeader from "../Component/AppHeader";
import { auth, db } from "../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const DashBoard = () => {
  const [photo, photoURL] = useState("");
  const [user, setUser] = useState("");
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        photoURL(user.photoURL);
        setUser(user.uid);
      }
    });
  });

  useEffect(() => {
    const q = query(
      collection(db, "courses"),
      where("InstructorId", "==", user)
    );

    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const corses = [];
        corses.push(doc.data());
        setCourses([...corses]);
      });
    });
  }, [user]);

  return (
    <>
      <div class="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
        <div class="app-header header-shadow">
          <div class="app-header__logo">
            <div>
              <span>
                <i>
                  <Link className="text-decoration-none" to="/">
                    {photo !== "" ? (
                      <img
                        src={photo}
                        style={{ height: "6vh" }}
                        className="rounded"
                      />
                    ) : (
                      "Somi"
                    )}
                  </Link>
                </i>
              </span>
            </div>
            <div class="header__pane ml-auto"></div>
          </div>
          <div class="app-header__mobile-menu"></div>
          <div class="app-header__menu">
            <span>
              <button
                type="button"
                class="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav"
              >
                <span class="btn-icon-wrapper">
                  <i class="fa fa-ellipsis-v fa-w-6"></i>
                </span>
              </button>
            </span>
          </div>{" "}
          {/* app heder */}
          <AppHeader />
          <ToastContainer />
        </div>{" "}
        <div class="ui-theme-settings">
          <button
            type="button"
            id="TooltipDemo"
            class="btn-open-options btn btn-warning"
          >
            <i class="fa fa-cog fa-w-16 fa-spin fa-2x"></i>
          </button>
        </div>{" "}
        <div class="app-main">
          <div class="app-main__outer">
            <div class="app-main__inner">
              <div class="row mt-3">
                <div class="col-md-6 col-xl-4">
                  <div class="card mb-3 widget-content bg-midnight-bloom">
                    <div class="widget-content-wrapper text-white">
                      <div class="widget-content-left">
                        <div class="widget-heading"> Courses</div>
                        <div class="widget-subheading">Total Courses</div>
                      </div>
                      <div class="widget-content-right">
                        <div class="widget-numbers text-white">
                          <span>{courses.length}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 col-xl-4">
                  <div class="card mb-3 widget-content bg-arielle-smile">
                    <div class="widget-content-wrapper text-white">
                      <div class="widget-content-left">
                        <div class="widget-heading">Clients</div>
                        <div class="widget-subheading">Total Clients</div>
                      </div>
                      <div class="widget-content-right">
                        <div class="widget-numbers text-white">
                          <span>30</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 col-xl-4">
                  <div class="card mb-3 widget-content bg-grow-early">
                    <div class="widget-content-wrapper text-white">
                      <div class="widget-content-left">
                        <div class="widget-heading">Purchase</div>
                        <div class="widget-subheading">Purchased courses</div>
                      </div>
                      <div class="widget-content-right">
                        <div class="widget-numbers text-white">
                          <span>20</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <div class="main-card mb-3 card">
                    <div class="table-responsive">
                      <table class="align-middle mb-0 table table-borderless table-striped table-hover">
                        <thead>
                          <tr>
                            <th class="text-center">#</th>
                            <th class="text-center">description</th>
                            <th class="text-center">details</th>
                          </tr>
                        </thead>
                        <tbody>
                          {courses.map((course) => (
                            <tr>
                              <td class="text-center text-muted">#345</td>

                              <td class="text-center">{course.title}</td>
                              <td class="text-center">
                                <div class="">{course.description}</div>
                              </td>
                              <td class="text-center">
                                <button
                                  type="button"
                                  id="PopoverCustomT-1"
                                  class="btn btn-primary btn-sm"
                                >
                                  Details
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
