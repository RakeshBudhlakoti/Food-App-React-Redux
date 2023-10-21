import React, { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import useOnlineStatus from "../utils/useOnlineStatus";
import BestOfferSection from "./home/BestOfferSection";
import useRestaurantList from "../utils/useRestaurantList";
import Cuisines from "./home/Cuisines";

const Body = () => {
  const resInfo = useRestaurantList();

  // Local State Variables
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [listOfFilteredRestaurants, setListOfFilteredRestaurants] = useState(
    []
  );
  const [searchText, setSearchText] = useState("");

  // Fetch data when the component mounts
  useEffect(() => {
    if (resInfo) {
      const restaurant_list = "restaurant_grid_listing";
      const restaurantCard = resInfo?.cards.find(
        (card) => card.card.card.id === restaurant_list
      );
      let finalData =
        restaurantCard?.card?.card?.gridElements.infoWithStyle.restaurants ||
        [];
      setListOfRestaurants(finalData);
      setListOfFilteredRestaurants(finalData);
    }
  }, [resInfo]);

  // Function to handle restaurant filtering based on search text
  const handleSearch = () => {
    const filteredRestaurants = listOfRestaurants.filter((res) => {
      const restaurantName = res.info.name.toLowerCase();
      return restaurantName.includes(searchText.toLowerCase());
    });
    setListOfFilteredRestaurants(filteredRestaurants);
  };

  // Function to handle filtering restaurants with a rating of 4+
 
  const handleFilters = (type) => {
    let filteredList = [];
  
    if (type === "rating4+") {
      filteredList = listOfRestaurants.filter((res) => res.info.avgRating >= 4);
    } else if (type === "fast-delivery") {
      filteredList = listOfRestaurants.slice().sort((a, b) => {
        const costA = parseInt(a.info.sla.deliveryTime);
        const costB = parseInt(b.info.sla.deliveryTime);
        return costA - costB;
      });
    } else if (type === "low-high") {
      filteredList = listOfRestaurants.slice().sort((a, b) => {
        const costA = parseInt(a.info.costForTwo.replace("₹", ""), 10);
        const costB = parseInt(b.info.costForTwo.replace("₹", ""), 10);
        return costA - costB;
      });
    } else if (type === "high-low") {
      filteredList = listOfRestaurants.slice().sort((a, b) => {
        const costA = parseInt(a.info.costForTwo.replace("₹", ""), 10);
        const costB = parseInt(b.info.costForTwo.replace("₹", ""), 10);
        return costB - costA;
      });
    }
    setListOfFilteredRestaurants(filteredList);
  };
  
  const onlineStatus = useOnlineStatus(); // check if online status ot Internat Available or NOT

  if (onlineStatus === false)
    return (
      <div className="offline-message">
        <h1>Your internet connection is not available.</h1>
        <h2>Please check your network connection and try again.</h2>
      </div>
    );
  return (
    <div className="body">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <BestOfferSection /> {/* Best Offer Section */}
            <Cuisines /> {/* Cuisines Section */}
            <div className="res-header">
              Restaurants with online food delivery near you!
            </div>
            <div className="Search">
              <div className="example">
                <input
                  type="text"
                  className="search-box"
                  value={searchText}
                  placeholder="Search Restaurants..."
                  onChange={(e) => {
                    setSearchText(e.target.value);
                    handleSearch();
                  }}
                  required
                />
              </div>
            </div>
            <div className="filter">
              <button
                type="button"
                className="btn btn-info filter-btn"
                onClick={() => handleFilters("rating4+")}
              >
                Ratings 4.0+
              </button>
              <button
                type="button"
                className="btn btn-info filter-btn"
                onClick={() => handleFilters("fast-delivery")}
              >
                Fast Delivery
              </button>
              <button
                type="button"
                className="btn btn-info filter-btn"
                onClick={() => handleFilters("low-high")}
              >
                Cost (Low to High)
              </button>
              <button
                type="button"
                className="btn btn-info filter-btn"
                onClick={() => handleFilters("high-low")}
              >
                Cost (High to Low)
              </button>
            </div>
            <div className="res-container">
              {listOfRestaurants.length === 0 ? (
                <Shimmer /> /* Display a loading shimmer effect while fetching data */
              ) : (
                <div className="res-body">
                  {listOfFilteredRestaurants.map((restaurant) => (
                    <RestaurantCard
                      key={restaurant.info.id}
                      resData={restaurant}
                    />
                  ))}
                </div>
              )}
              <div className="res-footer"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
