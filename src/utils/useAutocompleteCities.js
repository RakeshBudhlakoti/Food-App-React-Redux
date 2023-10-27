import { useState, useEffect, useCallback } from "react";
import { AUTOCOMPLETE_SEARCH_URL } from "./constants";

const useAutocompleteCities = ({ searchKey }) => {
  const [locations, setLocations] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      if (searchKey) {
        const response = await fetch(AUTOCOMPLETE_SEARCH_URL + searchKey);
        if (response.ok) {
          const data = await response.json();
          setLocations(data.data);
        } else {
          // Handle errors here
        }
      }
    } catch (error) {
      // Handle errors here
    }
  }, [searchKey]);


  useEffect(() => {
    if (searchKey) {
      fetchData();
    }
  }, [searchKey, fetchData]);


  return {
    locations,
    fetchData,
  };
  
};

export default useAutocompleteCities;

