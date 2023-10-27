import { RESTRA_LIST_URL } from "../utils/constants";
import { useState, useEffect } from "react";

const useRestaurantList = ({ lat, lng }) => {
  const [resInfo, setResInfo] = useState(null);

  // Use an effect that runs whenever lat or lng change
  useEffect(() => {
    const fetchData = async () => {
      try {
        //console.log("fetching data", lat, lng);
        const data = await fetch(RESTRA_LIST_URL + 'lat=' + lat + '&lng=' + lng);
        //console.log("Fetched restaurant");
        const json = await data.json();
        setResInfo(json.data);
      } catch (error) {
        // Handle errors here
      }
    };

    fetchData();
  }, [lat, lng]); // Include lat and lng in the dependency array

  return resInfo;
};

export default useRestaurantList;
