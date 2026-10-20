import AboutUsSection from "../components/landing/AboutUsSection";
import HeroSection from "../components/landing/HeroSection";
import PropertyCategoriesSection from "../components/landing/PropertyCategoriesSection";
import TestimonialsSection from "../components/landing/TestimonialsSection";

const Landing = () => {
  return (
    <div
      dir="rtl"
      className={`flex flex-col items-center md:pb-30 pb-10 bg-[#232323] `}
    >
      <HeroSection />
      <PropertyCategoriesSection />
      <AboutUsSection />
      <TestimonialsSection />
    </div>
  );
};

export default Landing;
