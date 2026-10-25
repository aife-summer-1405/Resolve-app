import AboutUsSection from "../components/organisms/landing/AboutUsSection";
import HeroSection from "../components/organisms/landing/HeroSection";
import OffersSection from "../components/organisms/landing/OffersSection";
import PopularDestinationsSection from "../components/organisms/landing/PopularDestinationsSection";
import PropertyCategoriesSection from "../components/organisms/landing/PropertyCategoriesSection";
import TestimonialsSection from "../components/organisms/landing/TestimonialsSection";

const Landing = () => {
  return (
    <div
      dir="rtl"
      className={`flex flex-col items-center gap-10 md:pb-30 pb-10 bg-[#232323] `}
    >
      <HeroSection />
      <PropertyCategoriesSection />
      <OffersSection />
      <PopularDestinationsSection />
      <AboutUsSection />
      <PopularDestinationsSection />
      <TestimonialsSection />
    </div>
  );
};

export default Landing;
