import React from "react";
import ItemLists from "../../components/Restaurant Detail Page/ItemLists";

// RestaurantCategory component represents an accordion category with a toggle button.
// It displays a list of items when expanded.

const RestaurantCategory = ({ data, showItems, toggleAccordion }) => {
  // Render the accordion item with a button that toggles the category open or closed.
  return (
    <div className="accordion-item">
      <button className="accordion-button" onClick={toggleAccordion}>
        {/* Display the category title and the number of items in parentheses */}
        {data.title} ({data.itemCards.length})
        <span>
          {/* Show an up or down arrow icon based on the showItems state */}
          <i className={`fa fa-angle-${showItems ? "up" : "down"}`}></i>
        </span>
      </button>
      {showItems && (
        // If showItems is true, display the content (item list) inside the accordion
        <div className="accordion-content">
          <ItemLists items={data.itemCards} />
        </div>
      )}
    </div>
  );
};

export default RestaurantCategory;
