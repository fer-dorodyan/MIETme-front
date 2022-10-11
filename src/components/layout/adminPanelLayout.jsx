import React, {useEffect} from 'react';
import Sidebar from "../Sidebar/sidebar";
import AdminSidebar from "../Sidebar/adminSidebar";
import {useNavigate} from "react-router-dom";

// layout for admin panel
const AdminPanelLayout = ({children}) => {


    const navigate = useNavigate()

    /**
     * check token exist in localstorage and role is admin or not
     * navigate to log in page if not
     */
    useEffect(() => {
        try {
            const userInfo = localStorage.getItem("userInfo")
            const role = JSON.parse(userInfo).role
            if (role !== "admin")
                throw new Error("access denied")
        } catch (err) {
            localStorage.clear()
            navigate("/login")
        }
    }, [])

    return (
        <div className="container-fluid">
            <div className="row">
                <AdminSidebar/>
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 w-75">
                    <div
                        className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h2">Admin Panel</h1>
                    </div>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminPanelLayout;
