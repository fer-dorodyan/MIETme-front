import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import logo from "../../assets/images/logo10.png"
import "./style.css";
import {showErrorMessage, showErrorMessageByAxiosError, showSuccessMessage} from "../../utilitis/toaster";
import AuthService from "../../service/authService";

function Signup() {
    let navigate = useNavigate();
    // state for userInfo
    const [userInfo, setUserInfo] = useState({
        firstName: "", lastName: "", email: "", phone: "", password: "", rePassword: "",
    });

    // validate inputs value
    const isValid = () => {
        if (!userInfo.email || !userInfo.firstName || !userInfo.lastName || !userInfo.email || !userInfo.phone || !userInfo.password || !userInfo.rePassword) return "all input must entered"
        if (userInfo.password !== userInfo.rePassword) return "password and confirm must be some"
    }

    // submit form and signup user
    const formHandler = (e) => {
        e.preventDefault();

        const error = isValid();
        if (error) return showErrorMessage(error)

        const {rePassword, ...body} = userInfo
        AuthService.signup(body)
            .then(({data}) => {
                showSuccessMessage(data.message)
                navigate("/login");
            })
            .catch((error) => {
                showErrorMessageByAxiosError(error)
            });
    };
    return (<div className="wrapper">
            <div className="logo">
                <img
                    src={logo}
                    alt=""
                />
            </div>
            <div className="text-center mt-4 name">
                MIET<span className="text-warning">me</span>
            </div>

            <form className="p-3 mt-3" onSubmit={formHandler}>
                <div className="form-field d-flex align-items-center">
                    <input name="email"
                           id="email" className="hiddenInputs"/>
                    <input type="password" className="hiddenInputs"/>
                    <span className="far fa-user"></span>

                    <input
                        type="text "
                        name="firstName"
                        id="firstName"
                        value={userInfo.firstName}
                        placeholder="First Name"
                        onChange={(e) => setUserInfo({...userInfo, firstName: e.target.value})}
                    />
                </div>

                <div className="form-field d-flex align-items-center">
                    <span className="far fa-user"></span>
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={userInfo.lastName}
                        onChange={(e) => setUserInfo({...userInfo, lastName: e.target.value})}
                    />
                </div>
                <div className="form-field d-flex align-items-center">
                    <span className="far fa-user"></span>
                    <input
                        type="email "
                        placeholder="Email"
                        value={userInfo.email}
                        onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                    />
                </div>
                <div className="form-field d-flex align-items-center">
                    <span className="far fa-user"></span>
                    <input
                        type="number"
                        name="phone"
                        id="phone"
                        value={userInfo.phone}
                        placeholder="Phone"
                        onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                    />
                </div>
                <div className="form-field d-flex align-items-center">
                    <span className="fas fa-key"></span>
                    <input
                        type="password"
                        name="password"
                        value={userInfo.password}
                        id="pwd"
                        placeholder="Password"
                        onChange={(e) => setUserInfo({...userInfo, password: e.target.value})}
                    />
                </div>
                <div className="form-field d-flex align-items-center">
                    <span className="fas fa-key"></span>
                    <input
                        type="password"
                        name="re-password"
                        value={userInfo.rePassword}
                        id="re-pwd"
                        placeholder="Repeat Password"
                        onChange={(e) => setUserInfo({...userInfo, rePassword: e.target.value})}
                    />
                </div>
                <button className="btn mt-3" type="submit">Signup</button>
            </form>
            <div className="text-center fs-6">
                <Link to="/login">Are you already signup?</Link>
            </div>
        </div>);
}

export default Signup;
