import myAxios from "./api";

// list of data fetched for contact
const ContactService = {
    sendMessage: (body) => {
        return myAxios.post(`/contact`, body)
    },

}

export default ContactService;
