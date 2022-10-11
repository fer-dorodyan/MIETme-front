import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import defaultImage from "../../assets/images/default.jpg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ProductService from "../../service/productService";
import {showErrorMessage, showErrorMessageByAxiosError, showSuccessMessage} from "../../utilitis/toaster";
import {FormInput, FormSelect, FormTextArea} from "./components/formInputs";
import {categoriesNavbar} from "../../components/Categories/CategoriesNavbar";
import moment from "moment";


// create or update product
function CreateEditProduct() {
    // id for update product , possible is null
    let {id} = useParams();
    const navigate = useNavigate();
    // state for agree checkbox
    const [agree, setAgree] = useState(false);
    // state for update or create mode
    const [editState, setEditState] = useState(false);
    // state for image
    const [productImage, setProductImage] = useState({
        empty: true,
        file: null,
        filePreview: null,
    });

    // die Daten werden wir von localstorage einlesen. localstorage ist String, mit JSON.parse wird zu Object ändern.
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))

    // ich brauche Email und phone aus userInfo, bei einem neuen Produkt erstellen:
    const {email, phone} = userInfo;

    // state for input values
    const [productInfo, setProductInfo] = useState({
        image: "",
        title: "",
        category: "",
        email: email,
        phone: phone,
        city: "",
        price: "",
        description: "",
    });

    // list of reserved dates
    const [reservedDates, setReservedDates] = useState([]);
    // date picker value state
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    // if update mode, get product detail and fill inputs and image and date picker
    useEffect(() => {
        if (id) {
            ProductService.getProductDetailById(id)
                .then(({data}) => {
                    setEditState(true);
                    setProductInfo(data);
                    const img = data.image ? data.image : defaultImage;
                    setProductImage({...productImage, filePreview: img});

                    if (data.reservedDates)
                        setReservedDates(data.reservedDates.map(function (item) {
                            return {startDate: item.startDate, endDate: item.endDate};
                        }))
                })
                .catch((error) => {
                    console.log(error)
                });
        }
    }, [id]);

    // Die ganze Form wird leer:
    const clearForm = () => {
        setProductInfo({
            image: "",
            title: "",
            email: "",
            category: "",
            phone: "",
            city: "",
            price: "",
            description: "",
        });
        setProductImage({
            empty: true,
            file: null,
            filePreview: null,
        });
        setDateRange([null, null])
    };

    //######## handle set image state #################
    const handleInputChange = (event) => {
        setProductImage({
            ...productImage,
            empty: false,
            file: event.target.files[0],
            filePreview: URL.createObjectURL(event.target.files[0]),
        });
    };
    // handle upload image
    const submitUploadImage = async () => {
        const formData = new FormData();
        formData.append("image", productImage.file);
        try {
            let res = await ProductService.uploadImage(formData);
            let data = await res.data;

            if (!data.error) {
                const img = data.fileName;
                return img;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    //######## submit form  #################//
    const formHandler = async (e) => {
        e.preventDefault();
        // validation
        if (!agree)
            return
        if (startDate || endDate)
            return showErrorMessage("you must add date to reserved date")
        let result = "";
        // upload image
        if (!productImage.empty) {
            result = await submitUploadImage();
            if (!result) {
                return showErrorMessage("Image upload failed");
            }
        }
        if (result)
            productInfo.image = result;
        productInfo.reservedDates = reservedDates

        if (editState) {
            // update product
            ProductService.editProduct(id, productInfo)
                .then(({data}) => {
                    showSuccessMessage(data.message)
                    navigate("/user-panel");
                })
                .catch((error) =>
                    showErrorMessageByAxiosError(error)
                );
        } else {
            // edit product
            ProductService.addProduct(productInfo)
                .then(({data}) => {
                    showSuccessMessage(data.message);
                    navigate("/user-panel");
                })
                .catch((error) =>
                    showErrorMessageByAxiosError(error)
                );
        }
    };

    // add date picker value to reserved dates
    function handleAddDate() {
        if (!startDate || !endDate)
            return;
        const dates = [...reservedDates]
        dates.push({
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString()
        })
        setReservedDates(dates)
        setDateRange([null, null])
    }

    // remove date from reserved dates
    function handleRemoveDate(index) {
        const dates = reservedDates.filter((item, i) => i !== index)
        setReservedDates(dates)
    }


    return (
        <>
            <div className="text-center">
                <h3 className="text-center mt-5">{id ? "Update Product" : "Create Product"}</h3>
                {productImage.filePreview !== null ? (
                    <img
                        className="previewImg mt-3 "
                        src={productImage.filePreview}
                        alt="UploadImage"
                    />
                ) : null}
            </div>
            <form
                className="row g-3 needs-validation w-50 m-auto p-5 pt-4"
                noValidate
                onSubmit={formHandler}
            >
                <div className="col-12">
                    <label htmlFor="validationCustom01" className="form-label d-block">
                        Image <span className="text-danger">*</span>
                    </label>
                    <input
                        type="file"
                        className="form-control"
                        id="validationCustom01"
                        required
                        name="image"
                        onChange={handleInputChange}
                    />

                    <div className="valid-feedback">Looks good!</div>
                </div>

                <FormInput value={productInfo.title} required label={"Title"} onChange={(e) =>
                    setProductInfo({...productInfo, title: e.target.value})
                }/>

                <FormSelect label="CategoryItem" required value={productInfo.category} onChange={(e) =>
                    setProductInfo({...productInfo, category: e.target.value})
                } options={categoriesNavbar.map(item => ({label: item.name, value: item.name}))}/>
                <FormInput value={productInfo.email} required label={"Email"} onChange={(e) =>
                    setProductInfo({...productInfo, email: e.target.value})
                }/>
                <FormInput value={productInfo.phone} type="number" required label={"Phone Number"} onChange={(e) =>
                    setProductInfo({...productInfo, phone: e.target.value})
                }/>
                <FormInput value={productInfo.city} required label={"City"} onChange={(e) =>
                    setProductInfo({...productInfo, city: e.target.value})
                }/>
                <FormInput value={productInfo.price} required className="withUnitEuro" type="number"
                           label={"Price (per 24hr in €)"}
                           onChange={(e) =>
                               setProductInfo({...productInfo, price: e.target.value})
                           }/>
                <div className="col-12">
                    <label htmlFor="validationCustom03" className="form-label">
                        Reserved Date
                    </label>

                    <ul className={'addedDates'}>{
                        reservedDates.map((item, index) => <li>
                            <span>{moment(item.startDate).format("DD-MM-YYYY")}</span>
                            <span>{moment(item.endDate).format("DD-MM-YYYY")}</span>
                            <i onClick={() => handleRemoveDate(index)} className="bi bi-trash addDate"></i>
                        </li>)}</ul>
                    <div className={"dateContainer"}>
                        <DatePicker
                            selected={startDate}
                            startDate={startDate}
                            endDate={endDate}
                            selectsRange={true}
                            dateFormat={"dd-MM-yyyy"}
                            excludeDateIntervals={reservedDates.map(item => ({
                                start: new Date(item.startDate),
                                end: new Date(item.endDate)
                            }))}
                            minDate={new Date()}
                            onChange={([start, end]) => {
                                // if (reservedDates.some(function (date) {
                                //     console.log("startDate", date.startDate.toISOString())
                                //     console.log("endDate", date.endDate.toISOString())
                                //     console.log("start", start.toISOString())
                                //     return date.startDate.toISOString() <= start.toISOString() && date.endDate.toISOString() > start.toISOString();
                                // }))
                                //     return alert("نمیشه");
                                setDateRange([start, end]);
                            }}
                            isClearable={true}
                        /><i onClick={handleAddDate} className="bi bi-plus addDate"></i>
                    </div>
                    <span className="datePickerHint">select date range that this product is reserved.</span>
                </div>

                <FormTextArea label={"Description"} required value={productInfo.description} onChange={(e) =>
                    setProductInfo({...productInfo, description: e.target.value})
                }/>
                <div className="col-12">
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value={agree}
                            onChange={e => setAgree(e.target.checked)}
                            id="invalidCheck"
                            required
                        />
                        <a href={"/roles"} className="roleCheckbox" target="_blank">
                            <label className="form-check-label">
                                Agree to terms and conditions
                            </label>
                        </a>
                        <div className="invalid-feedback">
                            You must agree before submitting.
                        </div>
                    </div>
                </div>
                <div className="col-12 text-center">
                    <button className="btn btn-warning" type="reset" onClick={clearForm}>
                        Clear
                    </button>

                    {/* Wenn "agree"-Checkbox ist noch nicht angehakt, "Send" Button wird disable */}
                    <button className={`btn btn-success ms-3 ${!agree && "disable"}`} type="submit"
                            title={"please accept roles..."}>
                        Save
                    </button>
                </div>
            </form>
        </>
    );
}

export default CreateEditProduct;
