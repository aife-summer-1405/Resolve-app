import { Suspense } from "react";
import ContactUsPage from "@/src/components/organisms/ContactUs/ContactUsPage";
import Loading from "@/src/Loading";

const Page = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <ContactUsPage />
      </Suspense>
    </>
  );
};

export default Page;
