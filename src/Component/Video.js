import React from "react";

import "../App.css";
function Video({ videoUrl }) {
  return (
    <div>
      <video className="video" src={videoUrl} controls></video>
    </div>
  );
}

export default Video;
