import React, { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { RESTRA_LIST_URL } from "../utils/constants";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  // Local State Variables
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [listOfFilteredRestaurants, setListOfFilteredRestaurants] = useState(
    []
  );
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
      //const restaurant_list = "restaurant_grid_listing";
      //const restaurantCard = json?.data?.cards.find((card) => card.card.card.id === restaurant_list);
      //let finalData = restaurantCard?.card?.card?.gridElements.infoWithStyle.restaurants || [];
      //setListOfRestaurants(finalData);
      //setListOfFilteredRestaurants(finalData);
      for (let i = 0; i < json.data.cards.length; i++) {
        let responseQuery =
          json.data.cards[i].card.card.gridElements.infoWithStyle.restaurants;
        if (responseQuery) {
          let finalData = responseQuery;
          setListOfRestaurants(finalData);
          setListOfFilteredRestaurants(finalData);
        }
      }
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

  const onlineStatus = useOnlineStatus();

  console.log(listOfRestaurants);
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
            
            <div className="res-header bestOfferSection">Best offers for you</div>
            <div className="image-row-container">
              <div className="image-item">
                <a aria-label="Flat deals">
                  <img
                    src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/rng/md/carousel/production/318cab799713a9739a56dc9d24659a8e"
                    alt="Flat deals"
                  />
                </a>
              </div>
              <div className="image-item">
                <a aria-label="Flat deals">
                  <img
                    src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/rng/md/carousel/production/31aa5d843272c2c8b2d6338460044630"
                    alt="Flat deals"
                  />
                </a>
              </div>
              <div className="image-item">
                <a aria-label="Flat deals">
                  <img
                    src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/rng/md/carousel/production/503d11056e224153e2f5146b69d96b6b"
                    alt="Flat deals"
                  />
                </a>
              </div>
            </div>

            <div className="res-header">What's on your mind?</div>
            <div class="image-scroll-container">
              <div class="image-item">
                <a aria-label="restaurants curated for khichdi">
                  <img
                    src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029851/PC_Creative%20refresh/3D_bau/banners_new/Khichdi.png"
                    alt="restaurants curated for khichdi"
                  />
                </a>
              </div>

              <div class="image-item">
                <a aria-label="restaurants curated for paratha">
                  <img
                    src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029853/PC_Creative%20refresh/3D_bau/banners_new/Paratha.png"
                    alt="restaurants curated for paratha"
                  />
                </a>
              </div>

              <div class="image-item">
                <a aria-label="restaurants curated for tea">
                  <img
                    src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/rng/md/carousel/production/cbb85a3c1684891105294d11f8359996"
                    alt="restaurants curated for tea"
                  />
                </a>
              </div>

              <div class="image-item">
                <a aria-label="restaurant curated for pav bhaji">
                  <img
                    src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029854/PC_Creative%20refresh/3D_bau/banners_new/Pav_Bhaji.png"
                    alt="restaurant curated for pav bhaji"
                  />
                </a>
              </div>

              <div class="image-item">
                <a aria-label="restaurants curated for sandwich">
                  <img
                    src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029860/PC_Creative%20refresh/3D_bau/banners_new/Sandwich.png"
                    alt="restaurants curated for sandwich"
                  />
                </a>
              </div>

              <div class="image-item">
                <a aria-label="restaurants curated for veg">
                  <img
                    src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029858/PC_Creative%20refresh/3D_bau/banners_new/Pure_Veg.png"
                    alt="restaurants curated for veg"
                  />
                </a>
              </div>

              <div class="image-item">
                <a aria-label="restaurants curated for poha">
                  <img
                    src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029857/PC_Creative%20refresh/3D_bau/banners_new/Poha.png"
                    alt="restaurants curated for poha"
                  />
                </a>
              </div>
            </div>
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
