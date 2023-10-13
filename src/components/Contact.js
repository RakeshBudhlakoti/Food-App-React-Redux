import { LOGO_URL } from "../utils/constants";
const Contact = () => {
  return (
    <div className="food-delivery-page">
      <header className="header">
        <h1>FoodVillage</h1>
      </header>
      <section className="main-content">
        <div className="restaurant-card">
          <img
            src={LOGO_URL}
            alt="Restaurant"
            className="restaurant-image"
          />
          <div className="restaurant-details">
            <h2>Delicious Diner</h2>
            <p>Cuisine: Italian, Mexican, Asian</p>
            <p>Delivery Time: 30-45 minutes</p>
            <p>Minimum Order: $20</p>
          </div>
        </div>
        <div className="restaurant-menu">
          <h3>Menu</h3>
          <ul>
            <li>Pizza - $12</li>
            <li>Pasta - $10</li>
            <li>Sushi - $15</li>
            <li>Tacos - $8</li>
          </ul>
        </div>
        <div className="order-button">
          <button>Order Now</button>
        </div>
      </section>

    </div>
  );
};

export default Contact;
