import React from 'react';

const Shimmer = () => {
  return (
    <div className="shimmerContainer">
      {[...Array(12)].map((index) => (
        <div key={index} className="shimmer-card"></div>
      ))}
    </div>
  );
};

export default Shimmer;