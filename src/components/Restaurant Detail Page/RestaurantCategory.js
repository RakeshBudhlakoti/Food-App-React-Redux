import { useState } from "react";
import ItemLists from "../../components/Restaurant Detail Page/ItemLists";

const RestaurantCategory = ({ accOpen, data }) => {
  const [isOpen, setIsOpen] = useState(accOpen);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion-item">
      <button className="accordion-button" onClick={toggleAccordion}>
        {data.title} ({data.itemCards.length})
        <span className={`accordion-icon ${isOpen ? "open" : "close"}`}></span>
      </button>
      {isOpen && (
        <div className="accordion-content">
          <ItemLists items={data.itemCards} />
        </div>
      )}
    </div>
  );
};

export default RestaurantCategory;
