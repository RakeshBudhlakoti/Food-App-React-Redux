  const ApiCall = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.4594965&lng=77.0266383&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    for(let i = 0; i < json.data.cards.length ; i++){
      if(json.data.cards[i].card.card.gridElements && json.data.cards[i].card.card.gridElements.infoWithStyle.restaurants != null && json.data.cards[i].card.card.gridElements.infoWithStyle.restaurants != ""){
          let finalData =  json.data.cards[i].card.card.gridElements.infoWithStyle.restaurants;
         return finalData;
          
      }
  }
  };

  export default ApiCall;