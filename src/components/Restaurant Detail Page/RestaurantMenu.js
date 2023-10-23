import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "../Shimmer";
import RestaurantCategory from "./RestaurantCategory";
import useRestaurantMenu from "../../utils/useRestaurantMenu";
import {CDN_URL,RESTRA_DETAIL_PAGE} from "../../utils/constants";

const RestaurantMenu = () => {
  // Get the restaurant ID from the URL
  const { resId } = useParams();
  // Fetch restaurant menu data
  const resInfo = useRestaurantMenu(resId);

  // State to store filtered item cards, filter, and counters for items
  const [itemCardsFiltered, setItemCardsFiltered] = useState([]);
  const [filter, setFilter] = useState("all");

  // State to manage the open category in the accordion
  const [openCategoryIndex, setOpenCategoryIndex] = useState(0);

  // Function to toggle the open category in the accordion
  const toggleAccordion = (index) => {
    setOpenCategoryIndex((prevIndex) => (index === prevIndex ? -1 : index));
  };

  // Effect to update item cards when resInfo changes
  useEffect(() => {
    if (resInfo) {
      const itemCardsData =
        resInfo.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card.itemCards ||
        resInfo.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card.itemCards;
      setItemCardsFiltered(itemCardsData);
    }
  }, [resInfo]);

  // Extracting categories from the response
  const categories = resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
    (c) => c?.card?.card["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  );

  // Function to handle filter selection
  // const handleToggle = (newFilter) => {
  //   setFilter(newFilter);

  //   if (newFilter === "veg") {
  //     setItemCardsFiltered(itemCardsFiltered.filter((item) => item.card.info.isVeg === 1));
  //   } else if (newFilter === "non-veg") {
  //     setItemCardsFiltered(itemCardsFiltered.filter((item) => item.card.info.isVeg !== 1));
  //   }
  // };

  // Loading state with Shimmer if resInfo is not available
  if (resInfo === null) {
    return <Shimmer />;
  }

  // Extracting restaurant data
  const restaurantData = resInfo.cards[0]?.card?.card?.info;

  return (
    <div className="restaurant-page">
      <div className="restaurant-container">
        <div className="restaurant-header">
          <div className="restaurant-image">
            <img src={`${CDN_URL}${restaurantData?.cloudinaryImageId}`} alt={restaurantData?.name} />
          </div>
          <div className="restaurant-details">
            <p className="restaurant-name">{restaurantData?.name}</p>
            <p className="restaurant-cuisines">{restaurantData?.cuisines?.join(", ")}</p>
            <p className="restaurant-area">
              {restaurantData?.areaName},&nbsp;{restaurantData?.sla.lastMileTravelString}
            </p>
            <span className="restaurant-message-text">
              <span className="deliveryImg">
                <img src={RESTRA_DETAIL_PAGE + restaurantData?.feeDetails.icon} />
              </span>
              {restaurantData?.feeDetails.message}
            </span>
          </div>
          <div className="restaurant-ratings-box">
            <div className="rating-divider">
              <span className="restaurant-rating">
                <i className="fa fa-star"></i>&nbsp;{restaurantData?.avgRating}
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
              <i className="fa fa-clock-o" aria-hidden="true"></i>&nbsp;{restaurantData?.sla.slaString}
            </span>
            <span>
              <i className="fa fa-rupee-sign" aria-hidden="true"></i>&nbsp;{restaurantData?.costForTwoMessage}
            </span>
          </div>
        </div>
      </div>
      <div className="content-wrapper">
        <div className="restaurant-menu">
          <div className="App">
            {categories.map((category, index) => (
              <RestaurantCategory
                key={index}
                data={category?.card?.card}
                showItems={index === openCategoryIndex}
                toggleAccordion={() => toggleAccordion(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
