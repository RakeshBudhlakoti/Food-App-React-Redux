import { CDN_URL, RESTRA_CDN_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams, Link } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import vegImage from '../images/veg.jpeg';
import nonVegImage from '../images/non-veg.jpeg';

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

  const [isVeg, setIsVeg] = useState(true); // State for Veg/Non-Veg toggle
  const [itemCards, setItemCards] = useState(null); // State for restaurant menu items
  const [itemCardsFiltered, setItemCardsFiltered] = useState(null); // State for restaurant menu items cloned for fiterator

  console.log(isVeg);
  useEffect(() => {
    // Fetch and set menu items when `resInfo` changes
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

  const handleToggle = () => {
    setIsVeg(!isVeg); // Toggle Veg/Non-Veg state
    console.log("isVeg " + isVeg);
    if (isVeg) {
      setItemCardsFiltered(
        itemCards.filter((item) => item.card.info.isVeg != 1)
      );
    } else {
      setItemCardsFiltered(
        itemCards.filter((item) => item.card.info.isVeg === 1)
      );
    }
  };

  if (resInfo === null) {
    return <Shimmer />; // Show loading shimmer while data is being fetched
  }

  const restaurantData = resInfo.cards[0]?.card?.card?.info;

  return (
    <div className="restaurant-page">
      <Link className="previous" to="/">
        &laquo; Back
      </Link>

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

      <div className="restaurant-menu">
        <h2 className="menu-heading">Menu</h2>
        <div className="veg-non-veg-slider">
          <label className={`option ${isVeg ? "selected" : ""}`}>Veg</label>
          <div className="slider" onClick={handleToggle}>
            <div className={`slider-knob ${isVeg ? "veg" : "non-veg"}`}></div>
          </div>
          <label className={`option ${isVeg ? "" : "selected"}`}>Non-Veg</label>
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
                <p className="item-description">{item.card.info.description}</p>
                <span className="item-price">
                  ₹
                  {item.card.info.price
                    ? item.card.info.price / 100
                    : item.card.info.defaultPrice / 100}
                </span>
                <p>
                  <span>
                   
                   {item.card.info.isVeg ?  <img className="veg-image" src={vegImage} alt=""/> :  <img className="nonveg-image" src={nonVegImage} alt=""/>}

                  </span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RestaurantMenu;
