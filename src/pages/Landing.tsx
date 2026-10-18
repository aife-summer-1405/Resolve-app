import HeroSection from "../components/landing/HeroSection";

const Landing = () => {
  return (
    <div className={`flex flex-col items-center gap-25 md:pb-30 pb-10`}>
      <HeroSection />
    </div>
  );
};

export default Landing;
