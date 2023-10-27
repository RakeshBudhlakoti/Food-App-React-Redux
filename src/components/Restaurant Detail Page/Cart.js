import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RESTRA_CDN_URL } from "../../utils/constants";
import { clearCart } from "../../utils/cartSlice";
import PayPalButton from "../../utils/PayPalButton";
import PaymentSuccess from "../PaymentSuccess";
import PayPalButton from "../../utils/PayPalButton";
import { useState } from "react";

const Cart = () => {
  let cartItems = useSelector((store) => store.cart.items);


  const [paymentDetails, setPaymentDetails] = useState(null);

  // Callback function to handle redirection to the success page
  const handleSuccess = (details) => {
    setPaymentDetails(details);
    dispatch(clearCart());
    // Redirect to the success page or perform any other desired action
  };



  function groupAndCountById(items) {
    let groupedItems = {};

    items.forEach((item) => {
      const id = item.id;
      if (groupedItems[id]) {
        groupedItems[id].count++;
      } else {
        groupedItems[id] = { ...item, count: 1 };
      }
    });

    // Convert the grouped object back to an array
    const result = Object.values(groupedItems);

    return result;
  }

  cartItems = groupAndCountById(cartItems);

  const gstPrice = 10;
  const deliveryCharge = 5;

  const calculateGrandTotal = () => {
    return cartItems.reduce(
      (total, item) => total + ((item.price||item.finalPrice||item.defaultPrice) / 100) * item.count,
      0
    );
  };

  const grandTotal = calculateGrandTotal();

  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return paymentDetails?.status === "COMPLETED" ? (
    <PaymentSuccess paymentDetails={paymentDetails} />
  ) : cartItems.length === 0 ? (
    <div className="_10-lm">
      <div className="_3a391"></div>
      <div className="_3Y9ZP">Your cart is empty</div>
      <div className="d7jCU">
        You can go to the home page to view more restaurants
      </div>
      <div className="_3pgCg">
        <Link to="/">See restaurants near you</Link>
      </div>
    </div>
  ) : (
    <div className="cart-page">
      <div className="left-block">
        <button className="btn btn-primary" onClick={handleClearCart}>
          Clear Cart
        </button>
        <table className="cart-items">
          <thead>
            <tr>
              <th>Image</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price (₹)</th>
              <th>Total (₹)</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index} className="cart-item">
                <td>
                  <img
                    src={`${RESTRA_CDN_URL}${item.imageId}`}
                    alt={item.name}
                    className="item-image"
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.count}</td>
                <td>
                  ₹
                  {item.price / 100 ||
                    item.finalPrice / 100 ||
                    item.defaultPrice / 100}
                </td>
                <td>
                  ₹
                  {(item.price / 100 ||
                    item.finalPrice / 100 ||
                    item.defaultPrice / 100) * item.count}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="order-summary">
          <p className="total-price">
            <span>Total Price:</span> <span>₹{grandTotal}</span>
          </p>
          <p className="gst-price">
            <span>GST:</span> <span>₹{gstPrice}</span>
          </p>
          <p className="delivery-charge">
            <span>Delivery Charge:</span> <span>₹{deliveryCharge}</span>
          </p>
          <p className="grand-total">
            <span>Grand Total:</span>{" "}
            <span>₹{grandTotal + gstPrice + deliveryCharge}</span>
          </p>
          <br />
          {/* Render PayPalButton only if paymentDetails is not available */}
          {!paymentDetails && (
            <PayPalButton totalAmount={grandTotal + gstPrice + deliveryCharge} onSuccess={handleSuccess} />
          )}
        </div>
      </div>
    </div>
  );
  
  
};

export default Cart;
