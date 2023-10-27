import { useState, useEffect, useCallback } from "react";
import { AREA_RESTAURANTS_FETCH_URL, GET_ADDRESS_BY_LAT_LNG } from "./constants";
import { useDispatch } from "react-redux";
import { addLatLng, clearLatLng,addAddress,clearAddress } from "./latLngSlice";

const useLocationLatLng = ({ placeId }) => {
  const dispatch = useDispatch();
  const [areaLatLong, setAreaLatLong] = useState([]);
  const [resInfo, setResInfo] = useState(null);

  const fetchLatLng = useCallback(async () => {
    try {
      if (placeId) {
        const response = await fetch(AREA_RESTAURANTS_FETCH_URL + placeId);
        if (response.ok) {
          const data = await response.json();
          setAreaLatLong(data.data[0].geometry.location);
          dispatch(clearLatLng());
          dispatch(addLatLng(data.data[0].geometry.location));
          // Call getAddress with latitude and longitude
          getAddress(data.data[0].geometry.location.lat, data.data[0].geometry.location.lng);
        } else {
          // Handle errors here
        }
      }
    } catch (error) {
      // Handle errors here
    }
  }, [placeId]);

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

  useEffect(() => {
    if (placeId) {
      fetchLatLng();
    }
  }, [placeId, fetchLatLng]);

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

  return {
    areaLatLong,
    resInfo,
    fetchLatLng,
  };
};

export default useLocationLatLng;
