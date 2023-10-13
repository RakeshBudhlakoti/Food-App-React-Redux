import React, { useState, useEffect } from "react";
import { CDN_URL,RESTRA_CDN_URL,MENU_API } from "../utils/constants";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";


const RestaurantMenu = () => {
  const [restaurantInfo, setRestaurantInfo] = useState(null);
  const [itemCards,setItemCards] = useState(null);
  const [error, setError] = useState(null);

  const {resId} = useParams();

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await fetch(MENU_API+resId+"&catalog_qa=undefined&submitAction=ENTER");

      const json = await response.json();

      const restaurantData = json.data?.cards[0]?.card?.card?.info;

      if (restaurantData) {
        setRestaurantInfo(restaurantData);
      } else {
        throw new Error("Restaurant data not found in response.");
      }
      const itemCardsData = (json?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card.itemCards)? json?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card.itemCards :json?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card.itemCards;

      if (!itemCardsData) {
        throw new Error("Item menu data not found in response.");
      }
      setItemCards(itemCardsData);
      
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
      setError("Failed to fetch restaurant data. Please try again later.");
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (restaurantInfo === null) {
    return <Shimmer />;
  }

  return (
    <div className="restaurant-page">
      <div className="restaurant-info">
        <div className="restaurant-image">
          <img
            src={CDN_URL+restaurantInfo.cloudinaryImageId}
            alt={restaurantInfo.name}
          />
        </div>
        <div className="restaurant-details">
          <h1 className="restaurant-name">{restaurantInfo.name}</h1>
          <p className="restaurant-rating">
            <b>Avg Rating:</b> {restaurantInfo.avgRating}
          </p>
          <p className="restaurant-ratings">
            <b>Total Ratings:</b> {restaurantInfo.totalRatingsString}
          </p>
          <p className="restaurant-delivery-time">
            <b>Delivery Time:</b> {restaurantInfo.sla.slaString} (
            {restaurantInfo.expectationNotifiers[0].text})
          </p>
          <p className="restaurant-cuisines">
            <b>Cuisines:</b> {restaurantInfo.cuisines.join(", ")}
          </p>
          <p className="restaurant-cost">
            <b>Cost for Two:</b> {restaurantInfo.costForTwoMessage}
          </p>
          <p className="restaurant-address">
            <b>Address:</b> {restaurantInfo.labels[1].message},{" "}
            {restaurantInfo.city}
          </p>
        </div>
      </div>

      <div className="restaurant-menu">
        <h2 className="menu-heading">Menu</h2>
        <ul className="menu-list">
          {itemCards.map((item, index) => (
            <li key={item.card.info.id} className="menu-item">
              <img
                src={RESTRA_CDN_URL + item.card.info.imageId}
                alt={item.card.info.name}
                className="menu-item-image"
              />
              <div className="menu-item-details">
                <h3 className="item-name">{item.card.info.name}</h3>
                <p className="item-description">{item.card.info.description}</p>
                <span className="item-price">₹{(item.card.info.price)?item.card.info.price/100:item.card.info.defaultPrice/100}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RestaurantMenu;
