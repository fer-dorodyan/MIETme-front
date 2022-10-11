import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import DatePicker from "react-datepicker";
import imageDefault from "../../assets/images/default.jpg";
import "./ProductDetails.css"
import moment from "moment";
import ProductService from "../../service/productService";
import {showErrorMessageByAxiosError, showSuccessMessage} from "../../utilitis/toaster";
import NewContractModal from "../../components/newContractModal/newContractModal";
import ContractService from "../../service/contractService";

export const DATE_FORMAT_STANDARD = "DD-MM-YYYY"

function ProductDetails() {

    // state for reserve modal open
    const [showContractModal, setShowContractModal] = useState(false)
    // state for date picker dialog open
    const [isOpen, setIsOpen] = useState(false);

    // toggle datepicker show
    const handleClick = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };
    // state for product favorite
    const [favorite, setFavorite] = useState(false);

    // id of current product
    let {id} = useParams();

    // add or remove current product to/from favorite list of user
    const addToFavorite = () => {
        if (favorite)
            ProductService.deleteProductFromFavoriteList(id)
                .then(res => {
                    setFavorite(false);
                }).catch(err => {
                showErrorMessageByAxiosError(err)
            })
        else
            ProductService.addProductToFavoriteList(id)
                .then(res => {
                    setFavorite(true);
                }).catch(err => {
                showErrorMessageByAxiosError(err)
            })
    };

    // detail of product
    const [productInfo, setProductInfo] = useState({
        image: "",
        title: "",
        category: "",
        email: "",
        phone: "",
        city: "",
        price: "",
        description: "",
        reservedDates: []
    });


    // load product detail by product id
    useEffect(() => {
        if (id) {
            ProductService.getProductDetailById(id)
                .then(({data}) => {
                    setProductInfo(data);
                    setFavorite(data.isFav)
                })
                .catch((error) => {
                    showErrorMessageByAxiosError(error)
                });
        }
    }, [id]);


    // check current product reserved now or not
    function isProductReserved() {
        return productInfo.reservedDates.some(item => {
            const start = moment(item.startDate).format(DATE_FORMAT_STANDARD);
            const end = moment(item.endDate).format(DATE_FORMAT_STANDARD);
            const now = moment().format(DATE_FORMAT_STANDARD)
            console.log(start, end, now)
            return now <= end && now >= start
        })
    }

    // close contract modal
    function handleCloseModal() {
        setShowContractModal(false)
    }

    // open contract modal
    function handleOpenModal() {
        setShowContractModal(true);
    }

    // request to reserve this product
    function handleSubmit(date) {
        const body = {
            startDate: date[0],
            endDate: date[1],
            productId: id,
            productOwner: productInfo.user
        }
        ContractService.newContract(body)
            .then(res => {
                showSuccessMessage("Request submitted successfully")
                setShowContractModal(false);
            }).catch(err => {
            showErrorMessageByAxiosError(err)
        })
    }


    // check current product is owned by logged-in user or not
    const myUserInfoStr = localStorage.getItem("userInfo")
    const myId = myUserInfoStr && JSON.parse(myUserInfoStr)?.id;
    const isMyProduct = productInfo.user === myId

    return (
        <div className="container ">
            <img
                className="w-75 m-auto d-block my-4 large-image"
                src={productInfo.image ? productInfo.image : imageDefault}
                alt=""
            />
            <h1 className="text-center">{productInfo.title} </h1>
            <div className="content bg-white rounded-3 border border-1 p-5 my-4">
                <div className="d-flex justify-content-between">
                    <div className="mb-3"><b className="pe-2">City: </b> {productInfo.city}</div>
                    <div className="d-flex  position-relative">
                        {
                            favorite ?
                                <i
                                    class="bi  bi-heart-fill text-danger fs-3"
                                    onClick={addToFavorite}></i>
                                :
                                <i class="bi bi-heart fs-3" onClick={addToFavorite}></i>
                        }
                        <button className="btn btn-warning ms-3 text-white " onClick={handleClick}>
                            show calender
                        </button>
                        {!isMyProduct &&
                            <button className="btn btn-primary ms-3 text-white " onClick={handleOpenModal}>
                                Request this Product
                            </button>
                        }
                        {isOpen && (
                            <DatePicker
                                excludeDateIntervals={productInfo.reservedDates.map(item => ({
                                    start: new Date(item.startDate),
                                    end: new Date(item.endDate)
                                }))}
                                inline
                            />
                        )}
                    </div>
                </div>
                <div className="mb-3"><b className="pe-2">Category: </b> {productInfo.category}</div>
                <div className="mb-3"><b className="pe-2">Email: </b> {productInfo.email}</div>
                <div className="mb-3"><b className="pe-2">Phone: </b>{productInfo.phone}</div>
                <div className="mb-3"><b className="pe-2">Price: </b>{productInfo.price}</div>
                <div className="mb-3"><b>Description:</b></div>
                <div className="mb-3">{productInfo.description}</div>
                <div>
                    <div className="mb-3"><b className="pe-2">Range
                        reserved:</b>
                        {productInfo.reservedDates?.filter(item => moment(item.startDate).diff(moment()) > 0).map(item =>
                            <p>{moment(item.startDate).format(DATE_FORMAT_STANDARD)} to {moment(item.endDate).format(DATE_FORMAT_STANDARD)}</p>)}
                    </div>
                </div>
                <div>
                    <div className="mb-3"><b className="pe-2">Status:</b>{isProductReserved() ? "Reserved" : "Free"}
                    </div>
                </div>
            </div>
            <NewContractModal show={showContractModal} handleSubmit={handleSubmit}
                              handleClose={handleCloseModal} reservedDates={productInfo.reservedDates}/>
        </div>
    );
}

export default ProductDetails;
