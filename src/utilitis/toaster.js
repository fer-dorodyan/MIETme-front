// Sweet Alert:

import swal from "sweetalert";

export const showSuccessMessage = (message) => {
    swal({
        title: "Good job!",
        text: message,
        icon: "success",
        button: "OK!",
    });
}
export const showErrorMessage = (message) => {
    swal({
        title: "Ooop...!",
        text: message,
        icon: "error",
        button: "OK!",
    })
}
export const showErrorMessageByAxiosError = (error) => {
    swal({
        title: "Ooop...!",
        text: error?.response.data.message || error?.message || "some problem accrued",
        icon: "error",
        button: "OK!",
    })
}
