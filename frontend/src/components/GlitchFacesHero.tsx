import React from "react";
import "./GlitchFacesHero.css";
import humanFace from "@/assets/human-face.jpg";
import robotFace from "@/assets/robot-face.jpg";

interface GlitchFacesHeroProps {
  fadedBackground?: boolean;
}

const GlitchFacesHero: React.FC<GlitchFacesHeroProps> = ({ fadedBackground = false }) => {
  return (
    <div className={`glitch-hero-container flex justify-center items-center py-8${fadedBackground ? " faded-bg" : ""}`}>
      <div className={`glitch-img-wrapper${fadedBackground ? " faded-bg-wrapper" : ""}`}>
        <img src={humanFace} alt="Human Face" className={`glitch-img human-glitch${fadedBackground ? " faded-img" : ""}`} />
        <img src={robotFace} alt="Robot Face" className={`glitch-img robot-glitch${fadedBackground ? " faded-img" : ""}`} />
      </div>
    </div>
  );
};

export default GlitchFacesHero; 