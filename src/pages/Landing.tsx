import AboutUsSection from "../components/organisms/landing/AboutUsSection";
import HeroSection from "../components/organisms/landing/HeroSection";
import OffersSection from "../components/organisms/landing/OffersSection";
import PopularDestinationsSection from "../components/organisms/landing/PopularDestinationsSection";
import PropertyCategoriesSection from "../components/organisms/landing/PropertyCategoriesSection";
import PropertyForSaleSection from "../components/organisms/landing/PropertyForSaleSection";
import TestimonialsSection from "../components/organisms/landing/TestimonialsSection";

import { getLocations } from "@/src/services/locationService";

const Landing = async () => {
  const locationsResponse = await getLocations();

  return (
    <div className={`flex flex-col items-center gap-10 md:pb-30 pb-10 bg-ba `}>
      <HeroSection locations={locationsResponse.data} />
      <PropertyCategoriesSection />
      <OffersSection />
      <PopularDestinationsSection />
      <AboutUsSection />
      <PropertyForSaleSection />
      <TestimonialsSection />
    </div>
  );
};

export default Landing;
