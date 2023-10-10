import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";

const Body = () => {
  //Local State Variables
  const [listOfRestaurants, setListOfRestaurants] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.493137&lng=77.19021219999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    setListOfRestaurants(
      json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };
  //Conditional Rendering
  return (
    <div className="body">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
          <div className="res-header">Restaurant List</div>
            <div className="Search">
              <input type="text" placeholder="Search" />
            </div>
            <div className="filter">
              <button
                type="button"
                className="btn btn-info filter-btn"
                onClick={() => {
                  const filteredList = listOfRestaurants.filter(
                    (res) => res.info.avgRating >= 4
                  );
                  setListOfRestaurants(filteredList);
                }}
              >
                Top Rated Restaurants
              </button>
            </div>

            <div className="res-container">
           { 
           listOfRestaurants.length === 0 ? (
                          <Shimmer />
                ) : (
             
              <div className="res-body">
                {listOfRestaurants.map((restaurant) => (
                  <RestaurantCard
                    key={restaurant.info.id}
                    resData={restaurant}
                  />
                ))}
              </div>
                )
}
              <div className="res-footer"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
