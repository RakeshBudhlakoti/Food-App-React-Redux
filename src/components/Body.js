import React, { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { RESTRA_LIST_URL } from "../utils/constants";

const Body = () => {
  // Local State Variables
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [listOfFilteredRestaurants, setListOfFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch restaurant data from the API
  const fetchData = async () => {
    try {
      const data = await fetch(RESTRA_LIST_URL);
      const json = await data.json();
      const restaurant_list = "restaurant_grid_listing";
      const restaurantCard = json?.data?.cards.find((card) => card.card.card.id === restaurant_list);
      let finalData = restaurantCard?.card?.card?.gridElements.infoWithStyle.restaurants || [];
      setListOfRestaurants(finalData);
      setListOfFilteredRestaurants(finalData);
      /*for (let i = 0; i < json.data.cards.length; i++) {
        let responseQuery = json.data.cards[i].card.card.gridElements.infoWithStyle.restaurants;
        if (responseQuery) {
          let finalData = responseQuery;
          setListOfRestaurants(finalData);
          setListOfFilteredRestaurants(finalData);
        }
      }
      */
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to handle restaurant filtering based on search text
  const handleSearch = () => {
    const filteredRestaurants = listOfRestaurants.filter((res) => {
      const restaurantName = res.info.name.toLowerCase();
      return restaurantName.includes(searchText.toLowerCase());
    });
    setListOfFilteredRestaurants(filteredRestaurants);
  };

  // Function to handle filtering restaurants with a rating of 4+
  const handleFilterRating = () => {
    const filteredList = listOfRestaurants.filter(
      (res) => res.info.avgRating > 4
    );
    setListOfFilteredRestaurants(filteredList);
  };

  return (
    <div className="body">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
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
                  }}
                  required
                />
                <button onClick={handleSearch}>
                  <i className="fa fa-search"></i> {/* Search icon */}
                </button>
              </div>
            </div>
            <div className="filter">
              <button
                type="button"
                className="btn btn-info filter-btn"
                onClick={handleFilterRating}
              >
                Rating 4+
              </button>
            </div>
            <div className="res-container">
              {listOfRestaurants.length === 0 ? (
                <Shimmer /> /* Display a loading shimmer effect while fetching data */
              ) : (
                <div className="res-body">
                  {listOfFilteredRestaurants.map((restaurant) => (
                    
                      <RestaurantCard key={restaurant.info.id} resData={restaurant} />
                    
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