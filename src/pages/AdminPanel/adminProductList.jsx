import React, {useEffect, useState} from 'react';
import AdminService from "../../service/adminService";
import {showErrorMessageByAxiosError} from "../../utilitis/toaster";

// admin page for show list of all products
const AdminProductList = () => {

    // all products state
    const [data, setData] = useState([])

    // fetch product list
    useEffect(() => {
        AdminService.getProducts()
            .then(res => {
                setData(res.data)
            }).catch(err => showErrorMessageByAxiosError(err))
    }, [])


    return (
        <div>
            <h3>All Products list</h3>
            <table className="table table-striped table-sm">
                <thead>
                <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>User</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
                {data.map(item => <tr>
                    <td><img src={item.image} height={30}/></td>
                    <td>{item.title}</td>
                    <td>{item.category}</td>
                    <td>{item.user.firstName+" "+item.user.lastName}</td>
                    <td>{item.price}</td>
                </tr>)}
                </tbody>
            </table>
        </div>
    );
};

export default AdminProductList;
