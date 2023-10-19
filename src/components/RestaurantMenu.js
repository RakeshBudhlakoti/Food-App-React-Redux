import { CDN_URL, RESTRA_CDN_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams, Link } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import vegImage from "../images/veg.jpeg";
import nonVegImage from "../images/non-veg.jpeg";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

  const [itemCards, setItemCards] = useState(null);
  const [itemCardsFiltered, setItemCardsFiltered] = useState([]);
  const [filter, setFilter] = useState("all");

  const [counters, setCounters] = useState({}); // Separate counts for each item

  useEffect(() => {
    if (resInfo) {
      const itemCardsData =
        resInfo.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card
          ?.card.itemCards ||
        resInfo.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card
          ?.card.itemCards;
      setItemCards(itemCardsData);
      setItemCardsFiltered(itemCardsData);
    }
  }, [resInfo]);

  const handleToggle = (newFilter) => {
    setFilter(newFilter);

    if (newFilter === "veg") {
      setItemCardsFiltered(
        itemCards.filter((item) => item.card.info.isVeg === 1)
      );
    } else if (newFilter === "non-veg") {
      setItemCardsFiltered(
        itemCards.filter((item) => item.card.info.isVeg !== 1)
      );
    } else {
      setItemCardsFiltered(itemCards);
    }
  };

  const handleAddClick = (itemId) => {
    const newCounters = { ...counters };
    newCounters[itemId] = (newCounters[itemId] || 0) + 1;
    setCounters(newCounters);
  };

  const handleDecrementClick = (itemId) => {
    if (counters[itemId] > 0) {
      const newCounters = { ...counters };
      newCounters[itemId] = newCounters[itemId] - 1;
      setCounters(newCounters);
    }
  };
  let cartItems = [];

  itemCardsFiltered.forEach((item) => {
    const itemId = item.card.info.id;
    if (counters[itemId]) {
      const availableItem = {
        name: item.card.info.name,
        price: item.card.info.finalPrice || item.card.info.price,
        count: counters[itemId],
      };
      cartItems.push(availableItem);
    }
  });

  console.log("cartItems ", cartItems);

  if (resInfo === null) {
    return <Shimmer />;
  }

  const restaurantData = resInfo.cards[0]?.card?.card?.info;

  return (
    <div className="restaurant-page">
      <div className="restaurant-info">
        <div className="restaurant-image">
          <img
            src={`${CDN_URL}${restaurantData?.cloudinaryImageId}`}
            alt={restaurantData?.name}
          />
        </div>
        <div className="restaurant-details">
          <h1 className="restaurant-name">{restaurantData?.name}</h1>
          <p className="restaurant-rating">
            <b>Avg Rating:</b> {restaurantData?.avgRating}
          </p>
          <p className="restaurant-ratings">
            <b>Total Ratings:</b> {restaurantData?.totalRatingsString}
          </p>
          <p className="restaurant-delivery-time">
            <b>Delivery Time:</b> {restaurantData?.sla.slaString} (
            {restaurantData?.expectationNotifiers
              ? restaurantData?.expectationNotifiers[0]?.text
              : ""}
            )
          </p>
          <p className="restaurant-cuisines">
            <b>Cuisines:</b> {restaurantData?.cuisines?.join(", ")}
          </p>
          <p className="restaurant-cost">
            <b>Cost for Two:</b> {restaurantData?.costForTwoMessage}
          </p>
          <p className="restaurant-address">
            <b>Address:</b> {restaurantData?.labels[1]?.message},{" "}
            {restaurantData?.city}
          </p>
        </div>
      </div>
      <div className="content-wrapper">
        <div className="restaurant-menu">
          <h2 className="menu-heading">Menu</h2>
          <div className="toggle-buttons">
            <button
              className={`toggle-button ${filter === "all" ? "selected" : ""}`}
              onClick={() => handleToggle("all")}
            >
              {" "}
              All{" "}
            </button>
            <button
              className={`toggle-button ${filter === "veg" ? "selected" : ""}`}
              onClick={() => handleToggle("veg")}
            >
              {" "}
              Veg{" "}
            </button>
            <button
              className={`toggle-button ${
                filter === "non-veg" ? "selected" : ""
              }`}
              onClick={() => handleToggle("non-veg")}
            >
              {" "}
              Non-Veg{" "}
            </button>
          </div>
          <ul className="menu-list">
            {itemCardsFiltered?.map((item) => (
              <li key={item.card.info.id} className="menu-item">
                <img
                  src={`${RESTRA_CDN_URL}${item.card.info.imageId}`}
                  alt={item.card.info.name}
                  className="menu-item-image"
                />
                <div className="menu-item-details">
                  <h3 className="item-name">{item.card.info.name}</h3>
                  <p className="item-description">
                    {item.card.info.description}
                  </p>
                  <span className="item-price">
                    ₹
                    {item.card.info.price
                      ? item.card.info.price / 100
                      : item.card.info.defaultPrice / 100}
                  </span>
                  <p>
                    <span>
                      {item.card.info.isVeg ? (
                        <img className="veg-image" src={vegImage} alt="" />
                      ) : (
                        <img
                          className="nonveg-image"
                          src={nonVegImage}
                          alt=""
                        />
                      )}
                    </span>
                  </p>
                </div>
                <div className="menu-item-count">
                  <div className="button-counter">
                    {!counters[item.card.info.id] ? (
                      <button onClick={() => handleAddClick(item.card.info.id)}>
                        ADD
                      </button>
                    ) : (
                      <div className="counter">
                        <button
                          onClick={() =>
                            handleDecrementClick(item.card.info.id)
                          }
                        >
                          -
                        </button>
                        <span>{counters[item.card.info.id]}</span>
                        <button
                          onClick={() => handleAddClick(item.card.info.id)}
                        >
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

        <div className="cart-sidebar">
          <div className="cart-header">
            <h2>Your Cart</h2>
            <button className="close-button">&times;</button>
          </div>
          <div className="cart-items">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="cart-item">
                    <td>{item.name}</td>
                    <td>₹{(item.price / 100) * item.count}</td>
                    <td>{item.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="cart-total">
            <h3>Go To Cart</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
