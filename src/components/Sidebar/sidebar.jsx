import React, {useEffect, useState} from "react";
import "./Sidebar.css";
import {Link, useNavigate} from "react-router-dom";
import defaultAvatar from "../../assets/images/default-avatar.png";
import {showSuccessMessage} from "../../utilitis/toaster";

// sidebar of common pages
function Sidebar() {
    const navigate = useNavigate();
    // state for user info
    const [userInfo, setUserInfo] = useState({
        fullName: "",
        email: "",
        phone: "",
    });
    // get user info from localStorage
    useEffect(() => {
        if (localStorage.getItem("userInfo")) {
            setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
        }
    }, []);

    //handle logout
    const logout = () => {
        showSuccessMessage("logout successfully")
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");
        navigate("/");
    };

    return (
        <nav
            id="sidebarMenu"
            className="col-md-3 col-lg-2 d-md-block bg-dark sidebar collapse w-25"
        >
            <div href="/" className="text-center mb-3 mb-md-0 me-md-auto text-white">
                <img
                    src={defaultAvatar}
                    alt=""
                    className="bi me-2 rounded-circle"
                    width="100"
                ></img>
                <div className="fs-4 mt-3">{userInfo.fullName}</div>
            </div>

            <div className="position-sticky pt-3">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <div className="nav-link text-white ">
                            <span className="text-warning">Email:</span>
                            <div>{userInfo.email}</div>
                        </div>
                    </li>
                    <li className="nav-item">
                        <div className="nav-link text-white ">
                            <span className="text-warning">Phone:</span>
                            <div>{userInfo.phone}</div>
                        </div>
                    </li>
                </ul>

                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <span>Saved reports</span>

                    <span data-feather="plus-circle"></span>
                </h6>
                <ul className="nav flex-column mb-2">
                    <li className="nav-item">
                        <Link
                            className="nav-link text-white "
                            to="/user-panel"
                        >
                            <span data-feather="file-text"></span>
                            All Products
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            className="nav-link text-white "
                            to="/user-panel/create-edit-form"
                        >
                            <span data-feather="file-text"></span>
                            Add New Product
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            className="nav-link text-white "
                            to="/user-panel/myRequests"
                        >
                            <span data-feather="file-text"></span>
                            My Requests
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            className="nav-link text-white "
                            to="/user-panel/requestedProducts"
                        >
                            <span data-feather="file-text"></span>
                            Requested Products
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link
                            className="nav-link text-white "
                            to="/user-panel/favorite"
                        >
                            <span data-feather="file-text"></span>
                            Favorite Products
                        </Link>
                    </li>

                    {/*<li className="nav-item">*/}
                    {/*    <Link*/}
                    {/*        className="nav-link text-white "*/}
                    {/*        to="/user-panel/favorite-product"*/}
                    {/*    >*/}
                    {/*        <span data-feather="file-text"></span>*/}
                    {/*        Favorite Products*/}
                    {/*    </Link>*/}
                    {/*</li>*/}
                    <li className="nav-item ms-3 mt-4 w-100">
                        <Link to="/">
                            <button className="btn bg-white w-75">
                                <i className="bi bi-arrow-left-square  fs-5 me-2"></i>
                                Back to Home
                            </button>
                        </Link>
                    </li>
                    <li className="nav-item ms-3 mt-2 w-100">
                        <button
                            className="btn btn-warning text-white w-75 btn-logout py-2"
                            onClick={logout}
                        >
                            <svg className="logout-icon me-2" version="1.1"
                                 viewBox="0 0 24 24" space="preserve"
                                 xmlns="http://www.w3.org/2000/svg"
                            >
                                <g id="grid_system"/>
                                <g id="_icons">
                                    <g>
                                        <path fill="white"
                                              d="M16.6,4.2c-0.5-0.3-1.1-0.1-1.4,0.4c-0.3,0.5-0.1,1.1,0.4,1.4c2.1,1.3,3.5,3.6,3.5,6c0,3.9-3.1,7-7,7s-7-3.1-7-7    c0-2.5,1.4-4.8,3.5-6.1C9,5.6,9.2,5,8.9,4.6C8.6,4.1,8,3.9,7.5,4.2C4.7,5.8,3,8.8,3,12c0,5,4,9,9,9s9-4,9-9    C21,8.8,19.3,5.9,16.6,4.2z"/>
                                        <path fill="white"
                                              d="M12,13c0.6,0,1-0.4,1-1V3c0-0.6-0.4-1-1-1s-1,0.4-1,1v9C11,12.6,11.4,13,12,13z"/>
                                    </g>
                                </g>
                            </svg>
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Sidebar;
