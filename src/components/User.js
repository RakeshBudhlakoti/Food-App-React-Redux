import React from "react";
import { useState } from "react";
const User = ({ name, title, imageSrc, description }) => {
    const [count] = useState(0);
  return (
    <div className="team-card">
      <img src={imageSrc} alt={name} className="team-card__image" />
      <h3 className="team-card__name">{name}</h3>
      <p className="team-card__title">{title}</p>
      <p className="team-card__title">Count : {count}</p>
      <p className="team-card__description">{description}</p>
    </div>
  );
};

export default User;
