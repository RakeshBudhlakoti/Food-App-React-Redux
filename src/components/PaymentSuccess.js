import React from "react";
import { Link } from "react-router-dom";
const PaymentSuccess = ({ paymentDetails }) => {
  return (
    <div className="payment-container">
      <div className="content">
        <i className="fa fa-check-circle icon" aria-hidden="true"></i>
        <h3 className="heading">Payment Successful!</h3>
        <p className="text">
          Thank you for your order. Order will deliver shortly.
        </p>

        <p className="order-details">Payment ID: {paymentDetails ? paymentDetails.id: ''}</p>
        <p className="order-details">
          Payer ID: {paymentDetails ? paymentDetails.payer.payer_id: ''}
        </p>
        <p className="order-details">
          Total Amount: ₹{paymentDetails ? paymentDetails.purchase_units[0].amount.value: ''}
        </p>
        <p className="order-details">Payment Status: {paymentDetails ? paymentDetails.status: ''}</p>
        <div className="button">
          <Link to="/" className="btn">
            Back To Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
