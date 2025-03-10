import { useParams } from 'react-router';
import { useFetchSingleRoom } from '../../../../../api/queries/room.query';
import { ArrowRight, BookMarkedIcon, EyeIcon, StepForward, TypeIcon, UsersIcon } from 'lucide-react';
import { Button } from '../../../../../components/ui/button';
import { useCreateBooking } from '../../../../../api/mutations/room.mutation';
import { useEditBookMutation } from '../../../../../api/mutations/booking.mutation';
import useAuthContext from '../../../../../hooks/useAuthContext';
import { usePaymentMutation } from '../../../../../api/mutations/payment.mutation';

export default function RoomDetail() {
  const params = useParams();
  const id = params.id || ""; 
  const { data: room } = useFetchSingleRoom(id);
  const { user } = useAuthContext(); // Get logged-in user
  const roomBookingId = room?.data.bookings.find((booking: any) => (booking.userId === user?.id && booking.status !== "cancelled"));
  const { mutate: createBooking, isLoading: isBooking } = useCreateBooking();
  const { mutate:cancelBooking,isLoading:isCancelling} = useEditBookMutation({initiatorName:(roomBookingId?.id || "")});
  const { mutate: paymentMutation,isLoading:isLoadingPayment} = usePaymentMutation({bookingId:(roomBookingId?.id || "")});

  const handleBooking = () => {
    createBooking(id);
  };

  const handleCancel = () => {
    cancelBooking({status:"cancelled"});
  };

  const handlePayment = async () => {
    paymentMutation();
  }
  // Safely destructure only if room?.data exists
  const {
    RoomNumber,
    Capacity,
    Status,
    Price,
    FloorNumber,
    Type,
    Description,
    bookings = []
  } = room?.data || {};

  // Find the user's active booking
  const userBooking = bookings.find(
    (booking:any) => booking.userId === user?.id && booking.status !== "cancelled"
  );

  return (
    <div className="bg-[#141c24] pb-6">
      <div className="grid grid-cols-[3fr_4fr] gap-20 border border-teal-800 py-3 px-10 pt-20 max-w-7xl mx-auto">
        <div className="relative scale-[1.15] -translate-x-3">
          <img
            className="object-cover"
            src="https://www.thehivehostels.com/uploads/images/1658301040_7796f3aa4d7819a2f5d5.jpeg"
            alt={`Room ${RoomNumber || 'Details'}`}
          />
        </div>

        <div className="text-teal-600 min-h-[60vh]">
          <h3 className="text-slate-300 font-black text-7xl mb-5 translate-x-[-254px] bg-teal-950 p-6 pb-1 w-[150%]">
            Room {RoomNumber || 'Details'}
          </h3>
          <p className="text-lg text-teal-300 mb-10">{Description || 'No description available.'}</p>

          <ul className="flex flex-col gap-4 mb-7">
            <li className="flex gap-3 items-center">
              <UsersIcon className="h-5 w-5 text-teal-600" />
              <span className="text-lg">For up to <span className="font-bold">{Capacity || 'N/A'}</span> guests</span>
            </li>
            <li className="flex gap-3 items-center">
              <BookMarkedIcon className="h-5 w-5 text-teal-600" />
              <span className="text-lg"><span className="font-bold">{Status || 'N/A'}</span></span>
            </li>
            <li className="flex gap-3 items-center">
              <StepForward className="h-5 w-5 text-teal-600" />
              <span className="text-lg">Floor <span className="font-bold">{FloorNumber || 'N/A'}</span></span>
            </li>
            <li className="flex gap-3 items-center">
              <TypeIcon className="h-5 w-5 text-teal-600" />
              <span className="text-lg"><span className="font-bold">{Type}</span></span>
            </li>
            <li className="flex gap-3 items-center">
              <p className="text-teal-600 text-lg font-medium">Rs.</p>
              <p className="text-lg"><span className="font-bold">{Price}</span></p>
            </li>
            <li className="flex gap-3 items-center">
              <EyeIcon className="h-5 w-5 text-teal-600" />
              <span className="text-lg">Privacy <span className="font-bold">100%</span> guaranteed</span>
            </li>
          </ul>

          <div className="flex flex-col gap-5 justify-start">
            {userBooking ? (
              <>
                <Button className="bg-teal-600 hover:bg-teal-700" disabled={isLoadingPayment} loading={isLoadingPayment} onClick={handlePayment}>
                  Pay Now with <img src="https://www.computershopnepal.com/assets/khalti.png" alt="img" width={25}/>
                </Button>
                <Button className="bg-red-600 hover:bg-red-700" onClick={() => handleCancel()} disabled={isCancelling || !roomBookingId}>
                  {isCancelling ? "Cancelling..." : "Cancel Booking"}
                </Button>
              </>
            ) : (
              <>
                <h2 className="text-lg text-orange-400 font-semibold text-left">
                  Book today. Pay on arrival.
                </h2>
                <Button onClick={handleBooking} className='bg-teal-600 hover:bg-teal-700' disabled={isBooking}>
                  {isBooking ? "Booking..." : "Book Now"} <ArrowRight />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
