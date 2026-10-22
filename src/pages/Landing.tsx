import AboutUsSection from "../components/landing/AboutUsSection";
import HeroSection from "../components/landing/HeroSection";
import OffersSection from "../components/landing/OffersSection";
import PropertyCategoriesSection from "../components/landing/PropertyCategoriesSection";
import TestimonialsSection from "../components/landing/TestimonialsSection";

const Landing = () => {
  return (
    <div
      dir="rtl"
      className={`flex flex-col items-center gap-10 md:pb-30 pb-10 bg-[#232323] `}
    >
      <HeroSection />
      <PropertyCategoriesSection />
      <OffersSection />
      <AboutUsSection />
      <TestimonialsSection />
    </div>
  );
};

export default Landing;
