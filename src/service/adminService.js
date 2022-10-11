import myAxios from "./api";

// list of data fetch for admin
const AdminService = {
    getUsers: () => {
        return myAxios.get(`/admin/users`)
    },
    getProducts: () => {
        return myAxios.get(`/admin/products`)
    },
    getContracts: () => {
        return myAxios.get(`/admin/contracts`)
    },
    getContacts: () => {
        return myAxios.get(`/admin/contacts`)
    },

}

export default AdminService;
