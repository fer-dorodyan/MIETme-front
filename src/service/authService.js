import myAxios from "./api";

// list of data fetches for authentication
const AuthService = {
    login: (email, password) => {
        return myAxios.post("/login", {email, password})
    },
    signup: (userInfo) => {
        return myAxios.post("/signup", userInfo)
    },
    forgetPassword: (email) => {
        return myAxios.get("/forget-password/" + email)
    },
    resetPassword: (newPassword, code) => {
        return myAxios.post("/reset-password", {newPassword, code})
    }
}

export default AuthService;
