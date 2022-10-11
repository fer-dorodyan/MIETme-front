import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import ContractService from "../../service/contractService";
import DatePicker from "react-datepicker";
import {showErrorMessageByAxiosError} from "../../utilitis/toaster";
import ReactToPrint from 'react-to-print';
import moment from "moment/moment";


// detail of user request to other products
const ReserveDetail = () => {

    // id of contract
    const {id} = useParams()
    // state for contract data
    const [data, setData] = useState()
    //  print ref
    const printBox = useRef()

    // get detail of request
    useEffect(() => {
        ContractService.getRequestDetail(id)
            .then(res => {
                setData(res.data)
            }).catch(err => showErrorMessageByAxiosError(err))
    }, [])


    if (!data) return <p>loading ...</p>

    // calculate contract difference start and end date
     const totalDays = Math.ceil(
        moment.duration(moment(data.endDate).diff(data.startDate)).asDays()
      );

    return (<div className="requestDetail">
        <img src={data.product.image} width={200} alt=""/>
        <h3>{data.product.title}</h3>
        <DatePicker
            excludeDateIntervals={[{
                start: new Date(data.startDate), end: new Date(data.endDate)
            }]}
            inline
        />
        <p>status : {data.status}</p>
        <p>description : {data.description}</p>
        {data.status === "Accepted" &&
            <>
                <ReactToPrint
                    trigger={() => <button className="btn btn-warning">Print
                        Contract</button>}
                    content={() => printBox.current}
                />
                <div className="contractBox" ref={printBox}>
            <h3>Rental Contract</h3>
            <p> Location, on …………………………… </p>

            <p>
              {" "}
              For the rental of The rental objects <b>{data.product.title}</b>.
              From lessor the{" "}
              <b>
                {data.productOwner.firstName + " " + data.productOwner.lastName}
              </b>{" "}
              accepts the tenant{" "}
              <b>
                {data.productRequester.firstName +
                  " " +
                  data.productRequester.lastName}
              </b>{" "}
              the following
            </p>
            <h3>agreement in its entirety:</h3>
            <ul>
              <li>
                Subject of the contract:
                <p>
                  The rental object is <b>{data.product.title}</b> In further
                  contract this article is called rental object.
                </p>
              </li>
              <li>
                Rental period, technical equipment data, accessories and prices
                as per offer/order:
                <p>
                  Exceeding the agreed rental period is generally not permitted
                  without consultation and consent of the lessor and may be
                  charged by the lessor with a surcharge in the amount of one
                  week's rent.
                </p>
              </li>
              <li>
                Deposit: (voluntary agreement):
                <p>
                  The hirer shall pay a deposit for the rental object to the
                  lessor upon collection. The agreed deposit is to be paid
                  (exclusively in CASH) and will be refunded (less the rental
                  costs including incidental costs) upon return of the rental
                  object. <br />
                  In the event of major damage to the rented property, the
                  lessor reserves the right to retain the deposit in full until
                  the repair costs incurred have been clarified and a settlement
                  is possible.
                </p>
              </li>
              <li>
                The current status of the rental item
                <p>
                  The parties to the contract take photos of the rented goods
                  and store the photos in a safe place.
                </p>
              </li>
              <li>
                Duties of the tenant:
                <p>
                  The unit is the property of the lessor. The tenant is obliged
                  to handle the rental object with care. Under no circumstances
                  is the lessee permitted to open the device / make changes to
                  the hardware. Otherwise, the device must be inspected by the
                  lessor at the lessor's expense (charged according to time
                  spent and damage incurred). In the event of damage to the
                  rental object, loss or theft, the lessee is obliged to inform
                  the lessor immediately.
                </p>
              </li>
              <li>
                Liability of the tenant:
                <p>
                  Damage to the rented property resulting from improper use must
                  be borne by the tenant. The costs of repairs are to be borne
                  by the tenant up to a maximum amount of the deposit. In the
                  event of loss or theft of or damage to the rented property,
                  the landlord shall retain the entire deposit paid. If
                  necessary, a report of the theft must be made by the tenant
                  and the transcript submitted to the landlord.
                </p>
              </li>
              <li>
                Cancellation conditions:
                <p>
                  Cancellation up to 2 days before the agreed date of arrival.
                </p>
              </li>
              <li>
                Further information:
                <p>
                  Additional work requested by the hirer (for example
                  installation of special software or equipment, data transfer
                  etc.) will be charged by the hirer at the current hourly rate.{" "}
                  <br />
                  The hirer must have a valid official photo ID with him/her at
                  the time of collection. A copy of this will be kept securely
                  with the deposit by the lessor. This copy of the ID will be
                  destroyed at the end of the rental period. <br />
                  The tenant confirms with his/her signature that he/she has
                  checked the rental object for functionality before taking it
                  over and declares that he/she fully agrees with all the above
                  points of this rental agreement. <br />
                  The Lessor confirms with his signature the receipt of: <br />
                  Rental Costs EUR {(+data.product.price).toFixed(2)} <br />
                  Days {totalDays}. <br /> <br />
                  _______________ <br />
                  GESAMTKOSTEN: EUR{" "}
                  {(totalDays * data.product.price).toFixed(2)} <br />
                </p>
              </li>
            </ul>

            <footer>
            <div> Product Owner Signature</div>
              <div> Borrower Signature</div>
            </footer>
          </div>
            </>}
    </div>);
};

export default ReserveDetail;
