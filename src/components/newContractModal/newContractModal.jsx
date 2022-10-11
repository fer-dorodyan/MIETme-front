import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import DatePicker from "react-datepicker";
import {showErrorMessage} from "../../utilitis/toaster";


// modal for request to product
const NewContractModal = ({show, handleClose, reservedDates, handleSubmit}) => {
    // date range
    const [date, setDate] = useState([null, null])
    const [startDate, endDate] = date;

    // validate
    function onSubmitAndValidate(e) {
        e.preventDefault();
        if (startDate && endDate)
            handleSubmit(date)
        else showErrorMessage("date must selected")
    }

    // reset date on reshow modal
    useEffect(() => {
        setDate([null, null])
    }, [show])

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Request Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmitAndValidate}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Select Date</Form.Label>
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
                                    setDate([start, end]);
                                }}
                                isClearable={true}
                            />
                        </div>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={onSubmitAndValidate}>
                    Request
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default NewContractModal;
