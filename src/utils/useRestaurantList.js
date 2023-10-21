import { RESTRA_LIST_URL } from "../utils/constants";
import { useState, useEffect } from "react";

import React from "react";
const useRestaurantList = () => {
  const [resInfo, setResInfo] = useState(null);

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch restaurant data from the API
  const fetchData = async () => {
    const data = await fetch(RESTRA_LIST_URL);
    const json = await data.json();
    setResInfo(json.data);
  };
  return resInfo;
};

export default useRestaurantList;
