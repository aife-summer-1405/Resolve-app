import React, { useEffect } from "react";
import HeroSection from "../components/landing/HeroSection";

const Landing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={`flex flex-col items-center gap-25 md:pb-30 pb-10`}>
      <HeroSection />
    </div>
  );
};

export default Landing;
