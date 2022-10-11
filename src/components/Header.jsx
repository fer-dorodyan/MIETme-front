import {Link, useLocation, useParams, useNavigate, matchPath} from "react-router-dom";
import {useEffect, useState} from "react";
import defaultAvatar from "../assets/images/default-avatar.png";
import logo from "../assets/images/logo10.png"
import {showSuccessMessage} from "../utilitis/toaster";


// header component for common pages
function Header({search}) {
    let navigate = useNavigate();
    // state for user is logged in or not
    const [isLogin, setIsLogin] = useState(false);
    const [fullName, setFullName] = useState("");
    // state for user is admin or not
    const [isAdmin, setIsAdmin] = useState(false);
    // state for search input value
    const [searchText, setSearchText] = useState("");

    const location = useLocation(); // Dieser Hook gibt das aktuelle Standortobjekt zurück


    /*
       check search query param in address bar
       if search exist set input value
       else set input value empty
    */
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        // wenn search state ändert sich,wird Eingabefeld von search leer
        console.log(params.get("search"))
        if (params.get("search"))
            setSearchText(params.get("search"))
        else setSearchText("")
    }, [location.search])

    // category param
    const {name} = useParams()
    ///////// search //////////
    const sendSearch = (e) => {
        e.preventDefault()
        if (search)
            search(searchText)
        else {
            // if category page append search query to end of category route
            if (matchPath("/categories/:name", location.pathname))
                navigate(`/categories/${name}?search=` + searchText)
            else navigate(`/home?search=${searchText}`)
        }
    }

    // set isAdmin and isLogin state based on localstorage info
    useEffect(() => {
        if (localStorage.getItem("token")) {
            setIsLogin(true);
            try {
                setFullName(JSON.parse(localStorage.getItem("userInfo")).fullName);
                setIsAdmin(JSON.parse(localStorage.getItem("userInfo")).role==='admin');
            } catch (err) {
                console.log(err)
            }
        }
    }, [isLogin]);

    ///////////// logout ////////////
    const logout = () => {
        showSuccessMessage("logout successfully")
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");
        setIsLogin(false);
        navigate("/");
    };

    return (
        <nav className="navbar navbar-header navbar-expand-lg navbar-dark bg-dark ">
            <div className="container-fluid">
                <Link to="/" className="text-decoration-none text-white bg-dark fs-4">
                    <img className="logo-header me-2" src={logo} alt=""/>
                    MIET<span className="text-warning">me</span>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse ms-5 d-flex justify-content-between"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/home" className="nav-link" aria-current="page">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about-us" className="nav-link">
                                About Us
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/contact-us" className="nav-link ">
                                Contact Us
                            </Link>
                        </li>
                    </ul>
                    <form className="d-flex search-form m-auto position-relative" onSubmit={sendSearch}>
                        <input
                            className="form-control me-2 rounded-3 py-2"
                            value={searchText}
                            placeholder="Search"
                            aria-label="Search"
                            onChange={(e) => setSearchText(e.target.value)}
                        />

                        {/* cursor: "pointer": handzeiger */}
                        <i class="bi bi-search position-absolute " onClick={sendSearch} style={{cursor: "pointer"}}></i>
                    </form>

                    {!isLogin ? (
                        <div className="d-flex">
                            <Link to="/login" className="btn btn-warning mx-3">
                                Login
                            </Link>

                            <Link to="/signup" className="btn btn-warning">
                                Sign Up
                            </Link>
                        </div>
                    ) : (
                        <div className="dropdown text-end me-auto">
                            <div
                                className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
                                id="dropdownUser1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <img
                                    src={defaultAvatar}
                                    alt=""
                                    className="bi me-2 rounded-circle"
                                    width="40"
                                ></img>
                                <div className="text-white">{fullName}</div>
                            </div>
                            <ul
                                className="dropdown-menu text-small"
                                aria-labelledby="dropdownUser1"
                            >
                                <li>
                                    <Link className="dropdown-item" to="/user-panel">
                                        User Panel
                                    </Link>
                                </li>
                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>
                                {isAdmin && <>
                                    <li>
                                        <Link className="dropdown-item" to="/admin-panel">
                                            Admin Panel 
                                        </Link>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider"/>
                                    </li>
                                </>}
                                <li>
                                    <button className="dropdown-item" to="#" onClick={logout}>
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Header;
