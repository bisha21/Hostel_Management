import { ArrowRight } from "lucide-react";
import { Button } from "../../../../../components/ui/button";
import { useCreateBooking } from "../../../../../api/mutations/room.mutation";

type BookingProps = {
  id: string;
};

const Booking = ({ id }: BookingProps) => {
  const { mutate: createBooking, isLoading } = useCreateBooking();

  const handleBooking = () => {
    createBooking(id);
  };

  return (
    <div className="flex flex-col gap-5 items-center justify-center">
      <h2 className="text-lg text-orange-400 font-semibold text-center">
        Book today. Pay on arrival.
      </h2>
      <Button onClick={handleBooking} disabled={isLoading}>
        {isLoading ? "Booking..." : "Book Now"} <ArrowRight />
      </Button>
    </div>
  );
};

export default Booking;
