import React, { useState } from "react"; // Removed unused 'useEffect'

const Grocery = () => {
  const [leftItems, setLeftItems] = useState([
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
  ]);
  const [rightItems, setRightItems] = useState([]);
  const [checkedLeftItems, setCheckedLeftItems] = useState([]);
  const [checkedRightItems, setCheckedRightItems] = useState([]);

  const moveItems = (direction) => {
    if (direction === "right") {
      setLeftItems(
        leftItems.filter((item) => !checkedLeftItems.includes(item))
      );
      setRightItems([...rightItems, ...checkedLeftItems]);
      setCheckedLeftItems([]);
    } else if (direction === "left") {
      setRightItems(
        rightItems.filter((item) => !checkedRightItems.includes(item))
      );
      setLeftItems([...leftItems, ...checkedRightItems]);
      setCheckedRightItems([]);
    }
  };

  const handleCheckboxChange = (item, box) => {
    if (box === "left") {
      setCheckedLeftItems((prevItems) => {
        if (prevItems.includes(item)) {
          return prevItems.filter((prevItem) => prevItem !== item);
        } else {
          return [...prevItems, item];
        }
      });
    } else if (box === "right") {
      setCheckedRightItems((prevItems) => {
        if (prevItems.includes(item)) {
          return prevItems.filter((prevItem) => prevItem !== item);
        } else {
          return [...prevItems, item];
        }
      });
    }
  };

  return (
    <div className="appBox">
      <div className="box">
        <div className="box-content">
          <h2>Left Box</h2>
          {leftItems.map((item) => (
            <div key={item}>
              <input
                type="checkbox"
                checked={checkedLeftItems.includes(item)}
                onChange={() => handleCheckboxChange(item, "left")}
              />{" "}
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="button-container">
        <button onClick={() => moveItems("right")}>Move Right</button>
        <button onClick={() => moveItems("left")}>Move Left</button>
      </div>
      <div className="box">
        <div className="box-content">
          <h2>Right Box</h2>
          {rightItems.map((item) => (
            <div key={item}>
              <input
                type="checkbox"
                checked={checkedRightItems.includes(item)}
                onChange={() => handleCheckboxChange(item, "right")}
              />{" "}
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Grocery;
