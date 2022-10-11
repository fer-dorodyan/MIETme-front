import React, {useEffect, useState} from 'react';
import ContractService from "../../service/contractService";
import {showErrorMessageByAxiosError} from "../../utilitis/toaster";
import {Link} from "react-router-dom";
import moment from "moment";
import {DATE_FORMAT_STANDARD} from "../ProductDetails.jsx/productDetail";


// show list user request to other products
const MyRequests = () => {

    // requests
    const [data, setData] = useState([])

    // get list of requests
    useEffect(() => {
        ContractService.myRequest()
            .then(res => {
                setData(res.data)
            }).catch(err => showErrorMessageByAxiosError(err))
    }, [])

    return (
        <div>
            <h3>My Requests</h3>
            <table className="table table-striped table-sm">
                <thead>
                <tr>
                    <th>Product</th>
                    <th>Owner</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Status</th>
                    <th scope="col" className="text-center">
                        Action
                    </th>
                </tr>
                </thead>
                <tbody>
                {data.map(item => <tr>
                    <td>{item.product.title}</td>
                    <td>{item.productOwner.firstName + " " + item.productOwner.lastName}</td>
                    <td>{moment(item.startDate).format(DATE_FORMAT_STANDARD)}</td>
                    <td>{moment(item.endDate).format(DATE_FORMAT_STANDARD)}</td>
                    <td>{item.status}</td>
                    <td className="text-center">
                        <Link to={`/user-panel/myRequests/${item._id}`}
                              title="View"
                              className="border border-none border-warning bg-white rounded-3 bi bi-eye-fill edit-icon text-warning px-3"
                        />
                    </td>
                </tr>)}
                </tbody>
            </table>
        </div>
    );
};

export default MyRequests;
