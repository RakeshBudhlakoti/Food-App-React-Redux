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

          <h4 className="restraTitle">
            <b>{name}</b>
          </h4>
          <h5>{`${areaName} (${sla.slaString})`}</h5>
          <h5>{truncatedCuisines}</h5>
          <span className="allDescription">
            <p> 
            <span className={(avgRating >= 4) ? "rating" : "rating1"}><i className="fa fa-star"></i>&nbsp;{avgRating}</span>
            
            </p>
            <p>•</p>
            <p>{sla.lastMileTravelString}</p>
            <p>•</p>
            <p>{costForTwo}</p>
          </span>
        </div>
      </Link>
    </div>
  );
};

export default RestaurantCard;
