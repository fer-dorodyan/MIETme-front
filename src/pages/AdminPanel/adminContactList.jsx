import React, {useEffect, useState} from 'react';
import AdminService from "../../service/adminService";
import {showErrorMessageByAxiosError} from "../../utilitis/toaster";


// admin page for show list of all contacts
const AdminContractList = () => {

    // all contacts state
    const [data, setData] = useState([])

    // fetch contact list
    useEffect(() => {
        AdminService.getContacts()
            .then(res => {
                setData(res.data)
            }).catch(err => showErrorMessageByAxiosError(err))
    }, [])


    return (
        <div>
            <h3>Contacts list</h3>
            <table className="table table-striped table-sm">
                <thead>
                <tr>
                    <th>FullName</th>
                    <th>Email</th>
                    <th>Message</th>
                </tr>
                </thead>
                <tbody>
                {data.map(item => <tr>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.message}</td>
                </tr>)}
                </tbody>
            </table>
        </div>
    );
};

export default AdminContractList;
