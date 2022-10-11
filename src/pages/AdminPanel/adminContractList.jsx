import React, {useEffect, useState} from 'react';
import AdminService from "../../service/adminService";
import {showErrorMessageByAxiosError} from "../../utilitis/toaster";
import moment from "moment";
import {DATE_FORMAT_STANDARD} from "../ProductDetails.jsx/productDetail";

// admin page for show list of all contracts
const AdminContractList = () => {

    // all contracts state
    const [data, setData] = useState([])

    // fetch contract list
    useEffect(() => {
        AdminService.getContracts()
            .then(res => {
                setData(res.data)
            }).catch(err => showErrorMessageByAxiosError(err))
    }, [])


    return (
        <div>
            <h3> All Contracts list</h3>
            <table className="table table-striped table-sm">
                <thead>
                <tr>
                    <th>Product Image</th>
                    <th>Product Title</th>
                    <th>Product Owner</th>
                    <th>Product Requester</th>
                    <th>Date</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {data.map(item => <tr>
                    <td><img src={item.product.image} height={30}/></td>
                    <td>{item.product.title}</td>
                    <td>{item.productOwner.firstName + " " + item.productOwner.lastName}</td>
                    <td>{item.productRequester.firstName + " " + item.productRequester.lastName}</td>
                    <td>{moment(item.startDate).format(DATE_FORMAT_STANDARD) + " to " + moment(item.endDate).format(DATE_FORMAT_STANDARD)}</td>
                    <td>{item.status}</td>
                </tr>)}
                </tbody>
            </table>
        </div>
    );
};

export default AdminContractList;
