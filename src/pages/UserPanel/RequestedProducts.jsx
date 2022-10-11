import React, {useEffect, useState} from 'react';
import ContractService from "../../service/contractService";
import {showErrorMessageByAxiosError} from "../../utilitis/toaster";
import {Link} from "react-router-dom";
import moment from "moment";
import {DATE_FORMAT_STANDARD} from "../ProductDetails.jsx/productDetail";

// show list of request to user products
const RequestedProducts = () => {

    // list of contracts
    const [data, setData] = useState([])

    // get list or request to user products
    useEffect(() => {
        ContractService.requestedList()
            .then(res => {
                setData(res.data)
            }).catch(err => showErrorMessageByAxiosError(err))
    }, [])

    return (
        <div>
            <h3>Requested Products</h3>
            <table className="table table-striped table-sm">
                <thead>
                <tr>
                    <th>Product</th>
                    <th>User</th>
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
                    <td>{item.productRequester.firstName + " " + item.productRequester.lastName}</td>
                    <td>{moment(item.startDate).format(DATE_FORMAT_STANDARD)}</td>
                    <td>{moment(item.endDate).format(DATE_FORMAT_STANDARD)}</td>
                    <td>{item.status}</td>
                    <td className="text-center">
                        <Link to={`/user-panel/requestedProducts/${item._id}`}
                              title="View"
                              className={`border border-none border-warning bg-white rounded-3 bi ${item.status === 'Pending' ? 'bi-pencil-fill' : 'bi-eye-fill'} edit-icon text-warning px-3`}
                        />
                    </td>
                </tr>)}
                </tbody>
            </table>
        </div>
    );
};

export default RequestedProducts;
