import myAxios from "axios";

// config axios base url and token header
myAxios.defaults.baseURL = "http://localhost:5000";
myAxios.defaults.headers.common = {
    token: localStorage.getItem("token")
}

export default myAxios;
