import React, {useEffect, useState} from 'react'
import "./UserPanel.css"
import {Link, useNavigate} from "react-router-dom";
import ProductService from "../../service/productService";
import {showErrorMessageByAxiosError, showSuccessMessage} from "../../utilitis/toaster";


function FavoriteList() {

    let navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);

    // check token exist in localstorage, else navigate user to login page
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            showSuccessMessage("You must login first!")
            navigate("/login")
        } else {
            setIsLogin(true)
        }
    }, [isLogin])


    // list of products
    const [products, setProducts] = useState([]);
    // id of selected product
    const [id, setId] = useState("");

    // fetch favorite product list on first render
    useEffect(() => {
        ProductService.getFavoriteList()
            .then(({data}) => {
                setProducts(data);
            })
            .catch((error) => {
                showErrorMessageByAxiosError(error)
            });
    }, []);


    // delete product from favorite list
    const deleteProduct = () => {
        ProductService.deleteProductFromFavoriteList(id)
            .then(({data}) => {
                showSuccessMessage(data.messages)
                setProducts(products => products.filter(item => item._id !== id))
            })
            .catch((error) => {
                showErrorMessageByAxiosError(error)
            });
    };


    return (
        <>
            <Link className="btn btn-warning my-4" to="/user-panel/create-edit-form">
                Add New Product
            </Link>
            <table className="table table-striped table-sm">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Category</th>
                    <th scope="col">City</th>
                    <th scope="col">Price</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col" className="text-center">
                        Action
                    </th>
                </tr>
                </thead>
                <tbody>
                {products.length ? (
                    products.map((item, index) => (
                        <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>{item.title}</td>
                            <td>{item.category}</td>
                            <td>{item.city}</td>
                            <td>{item.price}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td className="text-center">
                                <button title="delete"
                                        className="border border-none border-danger bg-white rounded-3 me-2 bi bi-trash3-fill delete-icon text-danger  px-3"
                                        type="button"
                                        data-bs-toggle="modal"
                                        data-bs-target="#deleteModal"
                                        onClick={() => setId(item._id)}
                                />
                                <Link to={`/product-details/${item._id}`}>
                                <button title="View"
                                        className="border border-none border-warning bg-white rounded-3 me-2 bi bi-eye-fill delete-icon text-warning  px-3"
                                        type="button"
                                />
                                </Link>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="7" className="text-center py-5"><h3>There is no product</h3></td>
                    </tr>
                )}
                </tbody>
            </table>

            {/* <!-- Modal --> */}
            <div
                className="modal fade"
                id="deleteModal"
                tabIndex="-1"
                aria-labelledby="deleteModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteModalLabel">
                                Delete Item
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            Are you sure to delete this product from favorite list?
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                                    onClick={deleteProduct}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FavoriteList
