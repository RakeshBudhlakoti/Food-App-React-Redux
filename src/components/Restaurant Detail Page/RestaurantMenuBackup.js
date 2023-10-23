import { CDN_URL, RESTRA_DETAIL_PAGE } from "../../utils/constants";
import { useEffect, useState } from "react";
import Shimmer from "../Shimmer";
import { useParams, Link } from "react-router-dom";
import useRestaurantMenu from "../../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

  const [itemCards, setItemCards] = useState(null);
  const [itemCardsFiltered, setItemCardsFiltered] = useState([]);
  const [filter, setFilter] = useState("all");

  const [openCategoryIndex, setOpenCategoryIndex] = useState(-1);
  const toggleAccordion = (index) => {
    if (index === openCategoryIndex) {
      // Clicking the same category, so close it
      setOpenCategoryIndex(-1);
    } else {
      setOpenCategoryIndex(index);
    }
  };

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
  }, []);
  // console.log(resInfo);
  const categories =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
      (c) =>
        c?.card?.["card"]?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  // console.log("categories", categories);
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
  // let cartItems = [];

  // itemCardsFiltered.forEach((item) => {
  //   const itemId = item.card.info.id;
  //   if (counters[itemId]) {
  //     const availableItem = {
  //       name: item.card.info.name,
  //       price: item.card.info.finalPrice || item.card.info.price,
  //       count: counters[itemId],
  //     };
  //     cartItems.push(availableItem);
  //   }
  // });

  if (resInfo === null) {
    return <Shimmer />;
  }

  const restaurantData = resInfo.cards[0]?.card?.card?.info;

  // console.log(restaurantData)

  return (
    <>
      <div className="restaurant-page">
        <div className="restaurant-container">
          <div className="restaurant-header">
            <div className="restaurant-image">
              <img
                src={`${CDN_URL}${restaurantData?.cloudinaryImageId}`}
                alt={restaurantData?.name}
              ></img>
            </div>
            <div className="restaurant-details">
              <p className="restaurant-name">{restaurantData?.name}</p>
              <p className="restaurant-cuisines">
                {restaurantData?.cuisines?.join(", ")}
              </p>

              <p className="restaurant-area">
                {restaurantData?.areaName},&nbsp;
                {restaurantData?.sla.lastMileTravelString}
              </p>

              <span className="restaurant-message-text">
                <span className="deliveryImg">
                  <img
                    src={RESTRA_DETAIL_PAGE + restaurantData?.feeDetails.icon}
                  />
                </span>
                {restaurantData?.feeDetails.message}
              </span>
            </div>
            <div className="restaurant-ratings-box">
              <div className="rating-divider">
                <span className="restaurant-rating">
                  <i className="fa fa-star"></i>&nbsp;
                  {restaurantData?.avgRating}
                </span>
                <hr className="dotted-separator" />
                <span className="restaurant-total-ratings">
                  {restaurantData?.totalRatingsString}
                </span>
              </div>
            </div>
          </div>
          <hr className="dotted-separator" />
          <div className="restaurant-time-cost">
            <div className="time-icon">
              <span>
                <i className="fa fa-clock-o" aria-hidden="true"></i>&nbsp;
                {restaurantData?.sla.slaString}
              </span>

              <span>
                <i className="fa fa-rupee-sign" aria-hidden="true"></i>&nbsp;{" "}
                {restaurantData?.costForTwoMessage}
              </span>
            </div>
          </div>
        </div>
        <div className="content-wrapper">
          <div className="restaurant-menu">
            {/* <div className="toggle-buttons">
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
          </div> */}

            {/* Categories Accordians */}

            <div className="App">
              {categories.map((category, index) => {
                return (
                  // <RestaurantCategory
                  //   key={index}
                  //   data={category?.card?.card}
                  //   showItems={index == showIndex ? true : false}
                  //   setShowIndex={()=>setShowIndex(index)} // Controlled Component

                  // />

                  <RestaurantCategory
                    key={index}
                    data={category?.card?.card}
                    showItems={index === openCategoryIndex}
                    toggleAccordion={() => toggleAccordion(index)}
                  />
                );
              })}
            </div>
          </div>

          {/* <div className="cart-sidebar">
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
        </div> */}
        </div>
        {/* <div className="restaurant-cart-fixed">
          <div className="menu-sticky-bottom">
            <button
              className="view-cart-button"
              data-testid="menu-view-cart-footer"
              aria-label="Cart details: 2 Items present, total: ₹1599. Double tap to go to Cart Page."
              id="view-cart-btn"
            >
              <div className="cart-details">
                <span className="cart-details-title">2 Items | ₹1599</span>
                <span className="cart-details-subtitle"></span>
              </div>
              <div className="view-cart">
                <span>View Cart</span>
                <img
                  alt="Cart Icon"
                  className="view-cart-icon"
                  height="14"
                  loading="lazy"
                  width="14"
                  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_28,h_28/ChatbotAssets/Checkout_Cart"
                />
              </div>
            </button>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default RestaurantMenu;
