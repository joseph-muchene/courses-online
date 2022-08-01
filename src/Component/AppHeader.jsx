import React from 'react'
import { Link } from 'react-router-dom'
import { deleteUser } from "firebase/auth";
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import { deleteDoc, doc } from 'firebase/firestore'
import { auth, db } from '../config/firebase'
import { toast } from 'react-toastify';
function AppHeader() {
    const navigate = useNavigate()

    const handleSignOut = () => {

        signOut(auth).then(() => {
            navigate("/login")
        }).catch((error) => {
            // An error happened.
        });
    }


    const handleDeleteAccount = async () => {
        const userItem = JSON.parse(localStorage.getItem("user"))
        await deleteDoc(doc(db, "users", userItem.uid));
        const user = auth.currentUser;
        deleteUser(user).then(() => {
            // clear the local storage
            localStorage.removeItem("user")
        }).catch((error) => {
            toast.error(error.message)
        });

    }
    return (
        <div>
            <div class="app-header__content">
                <div class="app-header-left">

                    <ul class="header-menu nav">
                        <li class="dropdown nav-item">
                            <a href="javascript:void(0);" class="nav-link">
                                <i class="nav-link-icon fa fa-cog"></i>
                                Settings
                            </a>
                        </li>
                    </ul>{" "}
                </div>
                <div class="app-header-right">
                    <div class="header-btn-lg pr-0">
                        <div class="widget-content p-0">
                            <div class="widget-content-wrapper">
                                <div class="widget-content-left">
                                    <div class="btn-group">
                                        <a
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                            class="p-0 btn"
                                        >
                                            <img
                                                width="42"
                                                class="rounded-circle"
                                                src="assets/images/avatars/1.jpg"
                                                alt=""
                                            />
                                            <i class="fa fa-angle-down ml-2 opacity-8"></i>
                                        </a>
                                        <div
                                            tabindex="-1"
                                            role="menu"
                                            aria-hidden="true"
                                            class="dropdown-menu dropdown-menu-right"
                                        >
                                            <button
                                                type="button"
                                                tabindex="0"
                                                class="dropdown-item"
                                            >
                                                <i class="fa-solid fa-user px-2"></i>
                                                <Link to="/profile" className='text-decoration-none text-black'>User Account</Link>
                                            </button>
                                            <button
                                                type="button"
                                                tabindex="0"
                                                onClick={handleDeleteAccount}
                                                class="dropdown-item"
                                            >
                                                <i class="fa-solid fa-trash-can px-2"></i>     Delete Account
                                            </button>
                                            <button
                                                type="button"
                                                tabindex="0"
                                                class="dropdown-item text-danger"
                                                onClick={handleSignOut}
                                            >
                                                <i class="fa-solid fa-trash-can px-2"></i>    Sign Out
                                            </button>
                                            <button
                                                type="button"
                                                tabindex="0"
                                                class="dropdown-item"
                                            >
                                                <i class="fa-solid fa-arrow-up-right-from-square px-2"></i>
                                                <Link to="/create/course" className='text-decoration-none text-black'>new course</Link>

                                            </button>


                                        </div>
                                    </div>
                                </div>
                                <div class="widget-content-left  ml-3 header-user-info">
                                    <div class="widget-heading">Alina Mclourd</div>
                                    <div class="widget-subheading">VP People Manager</div>
                                </div>
                                <div class="widget-content-right header-user-info ml-3">
                                    <button
                                        type="button"
                                        class="btn-shadow p-1 btn btn-primary btn-sm show-toastr-example"
                                    >
                                        <i class="fa text-white fa-calendar pr-1 pl-1"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>{" "}
                </div>
            </div>
        </div>
    )
}

export default AppHeader