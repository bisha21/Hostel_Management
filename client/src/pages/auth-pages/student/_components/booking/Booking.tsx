import { ArrowRight } from "lucide-react";
import { Button } from "../../../../../components/ui/button";

const Booking = () => {
  return (
    <div className="flex flex-col gap-5 items-center justify-center">
      <h2 className="text-5xl  text-orange-400 font-semibold text-center ">
        Book today. Pay on arrival.
      </h2>
      <Button >Book Now <ArrowRight/></Button>
    </div>
  );
};

export default Booking;
