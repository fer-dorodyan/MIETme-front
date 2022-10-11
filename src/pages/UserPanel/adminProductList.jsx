import React, {useEffect, useState} from 'react'
import "./UserPanel.css"
import {Link, useNavigate} from "react-router-dom";
import ProductService from "../../service/productService";
import {showErrorMessageByAxiosError, showSuccessMessage} from "../../utilitis/toaster";


function UserPanel() {

    let navigate = useNavigate();

    //### ein useState definiert:   ###
    const [isLogin, setIsLogin] = useState(false);

    // check token exist in localstorage, else navigate user to login page
    //## kontrollieren, ob ein Token oder userInfo existiert, wenn nicht, müss sich anlogen: ###
    useEffect(() => {
        if (!localStorage.getItem("token") || !localStorage.getItem("userInfo")) {
            showSuccessMessage("You must login first!")
            //local Storage wird gelöscht:
            localStorage.clear()
            // User wird zu Login Seite weiterleiten:
            navigate("/login")
        } else {
            // sonst ist User angelogt:
            setIsLogin(true)
        }
    }, [isLogin])

    // ####   product und ID State definieren:  ###
    const [products, setProducts] = useState([]); // für Product liste zu erhalten
    const [id, setId] = useState("");

    // für die Liste von Produkte von User zu bekommen und zu User selbst zeigen
    useEffect(() => {
        ProductService.getProductUser()    // request zu Server

            .then(({data}) => {            // wenn es die Daten(Produkte) bekommt,
                setProducts(data);         //dann werden die angekommene Daten in State einsetzen(setProduct)
            })
            .catch((error) => {
                showErrorMessageByAxiosError(error)   // Sweet alert sind in toster datei definiert
            });
    }, []);

    // ###   Delete funktion wird bei Delete Button ausrufen   ###
    const deleteProduct = () => {
        ProductService.deleteProduct(id)         //request zu Server
                    .then(({data}) => {          
                showSuccessMessage(data.messages)   
                setProducts(products => products.filter(item => item._id !== id)) // die wird von Browser auch gleichzeitig gelöscht
            })
            .catch((error) => {
                showErrorMessageByAxiosError(error)
            });
    };

    return (
        <>
        {/* jsx: */}

            <Link className="btn btn-warning my-4 color "  to="/user-panel/create-edit-form">
                Add New Product
            </Link>
            <table className="table table-striped table-sm">
                <thead>
                    {/* eine Tebelle für die Liste von Produkte angezeigt können */}
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

                {/* eine Map schleife für die Produkte */}
                <tbody>
                    {/* eine bootsrap tabelle in User-Admin-Panel- eine schleife auf dem exsistierte Produkte in eine tabelle */}
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
                                {/* wenn man auf diese Buttond druckt, wird Delete funktion ausführen  */}
                                <button title="delete"
                                        className="border border-none border-danger bg-white rounded-3 me-2 bi bi-trash3-fill delete-icon text-danger  px-3"
                                        type="button"
                                        data-bs-toggle="modal"
                                        data-bs-target="#deleteModal" // für Modal message (zeile 142 message) zu anzeigen
                                        onClick={() => setId(item._id)}
                                />

                                <Link to={`/user-panel/create-edit-form/${item._id}`}
                                      title="edit"
                                      className="border border-none border-warning bg-white rounded-3 bi bi-pencil-fill edit-icon text-warning px-3"
                                />
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        {/* wenn kein Produkt existiert: */}
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
                            Are you sure to delete this product?
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

export default UserPanel
