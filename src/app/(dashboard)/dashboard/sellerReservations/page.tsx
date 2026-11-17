import Reservations from "@/src/components/organisms/DashboardSeller/reservations/Reservations";
import React from "react";

const page = () => {
  return (
    <div className="mt-5 flex w-full flex-col gap-5">
      <Reservations />
    </div>
  );
};

export default page;
