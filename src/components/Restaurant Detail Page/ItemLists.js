import React, { useState } from "react";
import { RESTRA_CDN_URL } from "../../utils/constants";
import vegImage from "../../images/veg.jpg";
import nonVegImage from "../../images/non-veg.jpg";
import defaultFood from "../../images/default-food.jpg";

const ItemLists = ({ items }) => {
  // State to manage item counters
  const [counters, setCounters] = useState({});

  // Function to handle the "Add" button click and increment item count
  const handleAddClick = (itemId) => {
    const newCounters = { ...counters };
    newCounters[itemId] = (newCounters[itemId] || 0) + 1;
    setCounters(newCounters);
  };

  // Function to handle decrementing item count
  const handleDecrementClick = (itemId) => {
    if (counters[itemId] > 0) {
      const newCounters = { ...counters };
      newCounters[itemId] = newCounters[itemId] - 1;
      setCounters(newCounters);
    }
  };
  //let cartItems = [];
  //   items.forEach((item) => {
  //     const itemId = item.card.info.id;
  //     if (counters[itemId]) {
  //       const availableItem = {
  //         name: item.card.info.name,
  //         price: item.card.info.finalPrice || item.card.info.price,
  //         count: counters[itemId],
  //       };
  //       cartItems.push(availableItem);
  //     }
  //   });
  return (
    <div>
      <ul className="menu-list">
        {items?.map((item) => (
          <li key={item.card.info.id} className="menu-item">
            <div className="menu-item-details">
              <p>
                {/* Display a Veg or Non-Veg icon based on the item's "isVeg" property */}
                <span>
                  {item.card.info.isVeg ? (
                    <img className="veg-image" src={vegImage} alt="" />
                  ) : (
                    <img className="nonveg-image" src={nonVegImage} alt="" />
                  )}
                </span>
              </p>
              <h3 className="item-name">{item.card.info.name}</h3>
              <p className="item-description">{item.card.info.description}</p>
              <span className="item-price">
                {item.card.info.price && item.card.info.finalPrice ? (
                  <div>
                    <span className="strikethrough">
                      ₹{item.card.info.price / 100}
                    </span>
                    <span>₹{item.card.info.finalPrice / 100}</span>
                  </div>
                ) : (
                  <span>
                    ₹
                    {item.card.info.price / 100 ||
                      item.card.info.finalPrice / 100 ||
                      item.card.info.defaultPrice / 100}
                  </span>
                )}
              </span>
            </div>

            <div className="menu-item-count">
              {/* Display the item's image if available, otherwise show a default food image */}
              {item.card.info.imageId ? (
                <img
                  src={`${RESTRA_CDN_URL}${item.card.info.imageId}`}
                  alt={item.card.info.name}
                  className="menu-item-image"
                />
              ) : (
                <img
                  src={defaultFood}
                  alt={item.card.info.name}
                  className="menu-item-image"
                />
              )}

              <div className="button-counter">
                {!counters[item.card.info.id] ? (
                  // If the item count is 0, show an "Add" button
                  <button onClick={() => handleAddClick(item.card.info.id)}>
                    ADD
                  </button>
                ) : (
                  // If the item count is greater than 0, show a counter with "+" and "-" buttons
                  <div className="counter">
                    <button
                      onClick={() => handleDecrementClick(item.card.info.id)}
                    >
                      -
                    </button>
                    <span>{counters[item.card.info.id]}</span>
                    <button onClick={() => handleAddClick(item.card.info.id)}>
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemLists;
