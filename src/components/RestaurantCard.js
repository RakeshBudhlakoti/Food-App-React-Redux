import React from "react";
import { CDN_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const RestaurantCard = ({ resData }) => {
  if (!resData) {
    return null; // Handle the case where resData is not available
  }

  const {
    id,
    cloudinaryImageId,
    name,
    areaName,
    cuisines,
    costForTwo,
    avgRating,
    totalRatingsString,
    sla,
  } = resData.info || {};

  const truncatedCuisines = cuisines.join(", ").substring(0, 20) + "...";

  return (
    <div className="card">
      <Link to={"/restaurants/" + id}>
        <div className="cardBody">
          <img
            className="cardImg"
            src={`${CDN_URL}${cloudinaryImageId}`}
            alt="Restaurant Image"
          />

          <h4>
            <b>{name}</b>
          </h4>
          <h5>{`${areaName} (${sla.slaString})`}</h5>
          <h5>{truncatedCuisines}</h5>
          <h5>{costForTwo}</h5>
          <h5>
            <span className="rating">{avgRating}</span> ({totalRatingsString})
          </h5>
          {/* 
        <div className="orderNow-button">
          
        <Link to={"/restaurants/" + id} >
          <button>Order Now</button>
          </Link>
          </div>*/}
        </div>
      </Link>
    </div>
  );
};

export default RestaurantCard;
