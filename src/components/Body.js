import RestaurantCard from "./RestaurantCard";
import data from "../utils/resData";
import { useState } from "react";

const Body = () => {
  //Local State Variables
  const [listOfRestaurants, setListOfRestaurants] = useState(data);
  return (
    <div className="body">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
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

              <button
                type="button"
                className="btn btn-info filter-btn"
                onClick={() => {
                  
                  setListOfRestaurants(data);
                }}
              >
                Reset
              </button>
            </div>

            <div className="res-container">
              <div className="res-header">Restaurant List</div>
              <div className="res-body">
                {listOfRestaurants.map((restaurant) => (
                  <RestaurantCard
                    key={restaurant.info.id}
                    resData={restaurant}
                  />
                ))}
              </div>
              <div className="res-footer"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
