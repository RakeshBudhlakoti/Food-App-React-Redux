import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAutocompleteCities from "../utils/useAutocompleteCities";
import useLocationLatLng from "../utils/useLocationLatLng";
import {
  AREA_RESTAURANTS_FETCH_URL,
  GET_ADDRESS_BY_LAT_LNG,
} from "../utils/constants";
import {
  addLatLng,
  clearLatLng,
  addAddress,
  clearAddress,
} from "../utils/latLngSlice";

// Define your geocoding API URL
const Locations = ({ isOpen, onClose }) => {
  const areaLatLng = useSelector((store) => store.latLng.coordinates);
  const dispatch = useDispatch();
  const [searchKey, setSearchKey] = useState("");
  const [placeId, setPlaceId] = useState("");
  const [latitude, setLatitude] = useState(areaLatLng.length>0?areaLatLng[0].lat:26.8289443);
  const [longitude, setLongitude] = useState(areaLatLng.length>0?areaLatLng[0].lng:75.8056178);

  // const [latitude, setLatitude] = useState(areaLatLng[0].lat);
  // const [longitude, setLongitude] = useState(areaLatLng[0].lng);


  const { locations, fetchData } = useAutocompleteCities({ searchKey });
  const { areaLatLong, fetchLatLng } = useLocationLatLng({ placeId });
  const [resInfo, setResInfo] = useState(null);

  const getAddress = async (lat, lng) => {
    try {
      let requestUrl = GET_ADDRESS_BY_LAT_LNG + lat + "," + lng;

      const response = await fetch(requestUrl);
      if (response.ok) {
        const data = await response.json();
        setResInfo(data);
      } else {
        // Handle errors here
      }
    } catch (error) {
      // Handle errors here
    }
  };

  const getLatLng = (placeId) => {
    setPlaceId(placeId);
    onClose();
  };

  const handleClick = async () => {
    if (navigator.geolocation) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (position) => resolve(position),
            (error) => reject(error)
          );
        });
  
        console.log("first latlng",position.coords.latitude,position.coords.longitude);

        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
  
       // dispatch(clearLatLng());
       // dispatch(addLatLng({lat:position.coords.latitude, lng:position.coordinates.longitude}));

        const address = await getAddress(
          position.coords.latitude,
          position.coords.longitude
        );
  

  
        onClose();
      } catch (error) {
  
        // Provide a user-friendly error message
        if (error.code === error.PERMISSION_DENIED) {
          console.log("Geolocation permission denied. Please enable geolocation in your browser settings.");
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          console.log("Geolocation information is not available. Please check your network connection and try again.");
        } else if (error.code === error.TIMEOUT) {
          console.log("Geolocation request timed out. Please try again.");
        } else {
          console.log("An error occurred while fetching your location. Please try again later.");
        }
      }
    } else {
      console.log("Geolocation is not supported by your browser.");
    }
  };
  
  useEffect(() => {
    if (searchKey) {
      fetchData();
    }
  }, [searchKey, fetchData]);

  useEffect(() => {
    if (placeId) {
      fetchLatLng();
    }
  }, [placeId, fetchLatLng]);

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      const newLatLng = { lat: latitude, lng: longitude };
      console.log("newLatLng",newLatLng);
      dispatch(clearLatLng());
      dispatch(addLatLng(newLatLng));
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (resInfo) {
      const formatted_address = resInfo.data[0].address_components[1].short_name;
      const short_name = resInfo.data[0].address_components[3].short_name;

      if (formatted_address && short_name) {
        dispatch(clearAddress());
        dispatch(
          addAddress({
            main_text: short_name,
            secondary_text: formatted_address,
          })
        );
      }
    }
  }, [resInfo]);

  return (
    <div className={`sidepanel ${isOpen ? "open" : ""}`}>
      <a href="#" className="closebtn" onClick={onClose}>
        &times;
      </a>
      <div className="location-wrapper">
        <input
          type="text"
          className="search-location"
          placeholder="Search for area, street name.."
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <div className="current-location-current" onClick={handleClick}>
          <div className="current-location-icon">
            <i className="fa fa-crosshairs" aria-hidden="true"></i>
          </div>
          <div className="current-location-detail">
            <span className="current-location-name">Get Current Location</span>
            <span className="current-location-text">Using GPS</span>
          </div>
        </div>

        {locations.map((location, index) => (
          <div
            className="current-location"
            key={index}
            onClick={() => getLatLng(location.place_id)}
          >
            <div className="current-location-icon">
              <i className="fa fa-map-marker" aria-hidden="true"></i>
            </div>
            <div className="current-location-detail">
              <span className="current-location-name">
                {location.structured_formatting.main_text}
              </span>
              <span className="current-location-text">
                {location.structured_formatting.secondary_text}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Locations;
