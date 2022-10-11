import React, {useEffect, useState} from 'react';
import AdminService from "../../service/adminService";
import {showErrorMessageByAxiosError} from "../../utilitis/toaster";

// admin page for show list of all users
const AdminUserList = () => {

    // all users state
    const [data, setData] = useState([])

    // fetch user list
    useEffect(() => {
        AdminService.getUsers()
            .then(res => {
                setData(res.data)
            }).catch(err => showErrorMessageByAxiosError(err))
    }, [])


    return (
        <div>
            <h3>All Users list</h3>
            <table className="table table-striped table-sm">
                <thead>
                <tr>
                    <th>FullName</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Role</th>
                </tr>
                </thead>
                <tbody>
                {data.map(item => <tr>
                    <td>{item.firstName + " " + item.lastName}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.role}</td>
                </tr>)}
                </tbody>
            </table>
        </div>
    );
};

export default AdminUserList;
