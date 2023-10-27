const bestOfferSection = ({addressText}) => {
  return (
    <>
      <div className="res-header bestOfferSection">Best offers for you in {addressText}</div>
      <div className="image-row-container">
        <div className="image-item">
          <a aria-label="Flat deals">
            <img
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/rng/md/carousel/production/318cab799713a9739a56dc9d24659a8e"
              alt="Flat deals"
            />
          </a>
        </div>
        <div className="image-item">
          <a aria-label="Flat deals">
            <img
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/rng/md/carousel/production/31aa5d843272c2c8b2d6338460044630"
              alt="Flat deals"
            />
          </a>
        </div>
        <div className="image-item">
          <a aria-label="Flat deals">
            <img
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/rng/md/carousel/production/503d11056e224153e2f5146b69d96b6b"
              alt="Flat deals"
            />
          </a>
        </div>
      </div>
    </>
  );
};

export default bestOfferSection;