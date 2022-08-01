import React from "react";
import ReactStars from "react-rating-stars-component";
function Rating({ rating }) {
  return (
    <div className="d-flex justify-content-center mt-3">
      <ReactStars count={5} size={24} value={rating} edit={false} />
    </div>
  );
}

export default Rating;
