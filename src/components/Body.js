import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";

const Body = () => {
  //Local State Variables
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [searchText, setSearchText] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.4594965&lng=77.0266383&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    for(let i = 0; i < json.data.cards.length ; i++){
      if(json.data.cards[i].card.card.gridElements && json.data.cards[i].card.card.gridElements.infoWithStyle.restaurants != null && json.data.cards[i].card.card.gridElements.infoWithStyle.restaurants != ""){
          let finalData =  json.data.cards[i].card.card.gridElements.infoWithStyle.restaurants;
          setListOfRestaurants(finalData)
      }
  }
  };
  //Conditional Rendering
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
                <button
                  onClick={() => {
                    //// console.log(searchText);
                    //// console.log(listOfRestaurants);
                    const filteredRestaurants = listOfRestaurants.filter(
                      (res) => {
                        const restraName = res.info.name.toLowerCase();
                        return restraName.includes(searchText.toLowerCase());
                      }
                    );
                    console.log(filteredRestaurants);
                    setListOfRestaurants(filteredRestaurants);
                  }}
                >
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
            <div className="filter">
              <button
                type="button"
                className="btn btn-info filter-btn"
                onClick={() => {
                  const filteredList = listOfRestaurants.filter(
                    (res) => res.info.avgRating > 4
                  );
                  setListOfRestaurants(filteredList);
                }}
              >
                Rating 4+
              </button>
            </div>
            <div className="res-container">
              {listOfRestaurants.length === 0 ? (
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