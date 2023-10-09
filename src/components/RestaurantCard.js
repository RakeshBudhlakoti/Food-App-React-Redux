import {CDN_URL} from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props; // destructuring props
  const {
    cloudinaryImageId,
    name,
    areaName,
    cuisines,
    costForTwo,
    avgRating,
    totalRatingsString,
    sla,
  } = resData?.info;

  return (
    <div className="card">
      <img
        className="cardImg"
        src={CDN_URL + cloudinaryImageId}
        alt="Restaurant Image"
      />
      <div className="container">
        <h4>
          <b>{name}</b>
        </h4>
        <h5>
          {areaName} (Delivery in : {sla.slaString})
        </h5>
        <h5>{cuisines.join(", ")}</h5>
        <h5>{costForTwo}</h5>
        <h5>
          <span className="rating">{avgRating}</span> ({totalRatingsString})
        </h5>
      </div>
    </div>
  );
};

export default RestaurantCard;