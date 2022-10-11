import {useState} from "react";
import {Link} from "react-router-dom";
import logo from "../../assets/images/logo10.png"
import "./style.css";
import AuthService from "../../service/authService";
import {showErrorMessageByAxiosError, showSuccessMessage} from "../../utilitis/toaster";

function ForgetPassword() {


    const [email, setEmail] = useState("")

    // submit form and send email to server
    const onSubmitClick = (e) => {
        e.preventDefault();
        if (!email)
            return;
        AuthService.forgetPassword(email)
            .then(() => {
                showSuccessMessage("please check your inbox or spam!");
            })
            .catch((error) => {
                showErrorMessageByAxiosError(error)
            });
    };

    return (
        <div className="wrapper">
            <div className="logo">
                <img
                    src={logo}
                    alt=""
                />
            </div>
            <div className="text-center mt-4 name">
                MIET<span className="text-warning">me</span>
            </div>

            <form className="p-3 mt-3" onSubmit={onSubmitClick}>
                <input name="email"
                       id="email" className="hiddenInputs"/>
                <input type="password" className="hiddenInputs"/>
                <div className="form-field d-flex align-items-center">
                    <span className="far fa-user"></span>
                    <input
                        type="email"
                        value={email}
                        placeholder="Email"
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />
                </div>
                <button className="btn mt-3" type="submit" disabled={!email}>Send Recovery Link
                </button>
            </form>
            <div className="text-center fs-6">
                <Link to="/login">Login</Link> or{" "}
                <Link to="/signup">Sign up</Link>
            </div>
        </div>
    );
}

export default ForgetPassword;
