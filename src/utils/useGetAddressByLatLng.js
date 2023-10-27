import { GET_ADDRESS_BY_LAT_LNG } from "../utils/constants";
import { useState, useEffect } from "react";

const useGetAddressByLatLng = () => {
  const [resInfo, setResInfo] = useState(null);

  const getAddress = async (lat, lng) => {
    console.log("address async ", lat,lng)
    try {
      const response = await fetch(
        GET_ADDRESS_BY_LAT_LNG + lat + "," + lng,
        console.log("response",GET_ADDRESS_BY_LAT_LNG + lat + "," + lng)
      );
      if (!response.ok) {
        console.log("error 123 ")
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("setResInfo",data )
      setResInfo(data);
    } catch (error) {
      console.log("Error fetching data:", error);
      // Handle errors here
    }
  };
  // console.log("addressData",resInfo )
  return { getAddress, resInfo };
};

export default useGetAddressByLatLng;

