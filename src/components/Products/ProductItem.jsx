import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import DatePicker from "react-datepicker";
import ProductService from "../../service/productService";
import {showErrorMessageByAxiosError} from "../../utilitis/toaster";

// component for show single product
function ProductItem({product}) {
    const {
        _id,
        image,
        title,
        category,
        description,
       reservedDates,
        isFav,
        user,
    } = product;

    const  fullName = user && user.firstName + " "+ user.lastName

    const [favorite, setFavorite] = useState(isFav);  // mit diese wird die Herchen als Favorite aufgefühlt

    // state for open date picker
    const [isOpen, setIsOpen] = useState(false);
    const handleClick = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    // add or remove product to/from favorite
    const addToFavorite = () => {
        if (favorite)
            ProductService.deleteProductFromFavoriteList(_id)
                .then(res => {
                    setFavorite(false);
                }).catch(err => {
                showErrorMessageByAxiosError(err)
            })
        else
            ProductService.addProductToFavoriteList(_id)
                .then(res => {
                    setFavorite(true);
                }).catch(err => {
                showErrorMessageByAxiosError(err)
            })
    };

// da wird produkt angezeigt (image+ title )
    return (
        <div className="col  text-black ">
            <div className="card h-100 ">
                {/* image wird angezeigt: */}
                <Link to={`/product-details/${_id}`} className="text-decoration-none">
                    <img src={image} className="card-img-top image-card" alt="..."/>
                </Link>

                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <Link
                            to={`/product-details/${_id}`}
                            className="text-decoration-none"
                        >
                         {/* title wird angezeigt: */}
                            <h5 className="card-title">{title}</h5>
                        </Link>

                        {/* wenn es favorite ist, Herz wird full angezeigt: */}
                        {favorite ? (
                            <i
                                class="bi  bi-heart-fill text-danger"
                                onClick={addToFavorite}
                            ></i>
                        ) : (
                            <i class="bi bi-heart" onClick={addToFavorite}></i>
                        )}
                    </div>
                    <p className="username ">
                        <span className="text-muted">User: </span>
                        {fullName}
                    </p>
                    <p className="username ">
                        <span className="text-muted">Category: </span>
                        {category}
                    </p>
                    {description &&
                    <p className="card-text description">
                        {description.substring(0, 100)}
                    </p>
                    }
                </div>
                <div className="card-footer d-flex justify-content-between">
                    <Link
                        className="btn btn-warning text-white text-decoration-none"
                        to={`/product-details/${_id}`}
                    >
                        Details
                    </Link>
                    <button className="btn calender-btn text-white " onClick={handleClick}>
                        show calender
                    </button>
                    {isOpen && (
                        <DatePicker
                            excludeDateIntervals={reservedDates.map(item => ({
                                start: new Date(item.startDate),
                                end: new Date(item.endDate)
                            }))}
                            inline
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductItem;
