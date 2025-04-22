import { useNavigate, useParams } from "react-router";
import { useFetchSingleRoom } from "../../../../../api/queries/room.query";
import {
  ArrowRight,
  BookMarkedIcon,
  EyeIcon,
  StepForward,
  TypeIcon,
  UsersIcon,
  CalendarIcon,
} from "lucide-react";
import { Button } from "../../../../../components/ui/button";
import { useCreateBooking } from "../../../../../api/mutations/room.mutation";
import { useEditBookMutation } from "../../../../../api/mutations/booking.mutation";
import useAuthContext from "../../../../../hooks/useAuthContext";
import { usePaymentMutation } from "../../../../../api/mutations/payment.mutation";
import { useState } from "react";
import { roomImage } from "../../../../../constants";

export default function RoomDetail() {
  const params = useParams();
  const id = params.id || "";
  const { data: room } = useFetchSingleRoom(id);
  const { user, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  const roomBookingId = room?.data.bookings.find(
    (booking) => booking.userId === user?.id && booking.status !== "cancelled",
  );

  // State for start date selection
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { mutate: createBooking, isLoading: isBooking } = useCreateBooking();
  const { mutate: cancelBooking, isLoading: isCancelling } =
    useEditBookMutation({ initiatorName: roomBookingId?.id || "" });
  const { mutate: paymentMutation, isLoading: isLoadingPayment } =
    usePaymentMutation({ bookingId: roomBookingId?.id || "" });

  const handleBooking = () => {
    // Send the selected start date along with the booking request
    createBooking({
      roomId: id,
      startDate: startDate,
    });
    setShowDatePicker(false);
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleCancel = () => {
    cancelBooking({ status: "cancelled" });
  };

  const handlePayment = async () => {
    paymentMutation();
  };

  // Safely destructure only if room?.data exists
  const {
    RoomNumber,
    Capacity,
    Status,
    Price,
    FloorNumber,
    Type,
    Description,
    bookings = [],
  } = room?.data || {};

  // Find the user's active booking
  const userBooking = bookings.find(
    (booking) => booking.userId === user?.id && booking.status !== "cancelled",
  );

  return (
    <div className="bg-slate-50 pb-6">
      <div className="grid grid-cols-[3fr_4fr] gap-20 border border-slate-200 py-3 px-10 pt-20 max-w-7xl mx-auto">
        <div className="relative scale-[1.15] -translate-x-3">
          <img
            className="object-cover"
            src={
              Capacity >= 6
                ? "https://th.bing.com/th/id/OIP.yJpF118ooANYAKlaSFmFzQHaE7?rs=1&pid=ImgDetMain"
                : roomImage.find((room) => room.capacity === Capacity)?.src
            }
            alt={`Room ${RoomNumber || "Details"}`}
          />
        </div>

        <div className="text-slate-600 min-h-[60vh]">
          <h3 className="text-slate-800 font-black text-7xl mb-5 translate-x-[-254px] bg-slate-100 p-6 pb-1 w-[150%]">
            Room {RoomNumber || "Details"}
          </h3>
          <p className="text-lg text-slate-600 mb-10">
            {Description || "No description available."}
          </p>

          <ul className="flex flex-col gap-4 mb-7">
            <li className="flex gap-3 items-center">
              <UsersIcon className="h-5 w-5 text-emerald-500" />
              <span className="text-lg">
                For up to <span className="font-bold">{Capacity || "N/A"}</span>{" "}
                guests
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <BookMarkedIcon className="h-5 w-5 text-emerald-500" />
              <span className="text-lg">
                <span className="font-bold">{Status || "N/A"}</span>
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <StepForward className="h-5 w-5 text-emerald-500" />
              <span className="text-lg">
                Floor <span className="font-bold">{FloorNumber || "N/A"}</span>
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <TypeIcon className="h-5 w-5 text-emerald-500" />
              <span className="text-lg">
                <span className="font-bold">{Type}</span>
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <p className="text-emerald-600 text-lg font-medium">Rs.</p>
              <p className="text-lg">
                <span className="font-bold">{Price}</span>
              </p>
            </li>
            <li className="flex gap-3 items-center">
              <EyeIcon className="h-5 w-5 text-emerald-500" />
              <span className="text-lg">
                Privacy <span className="font-bold">100%</span> guaranteed
              </span>
            </li>
          </ul>

          <div className="flex flex-col gap-5 justify-start">
            {userBooking ? (
              <>
                <Button
                  className="bg-emerald-500 hover:bg-emerald-600"
                  disabled={isLoadingPayment}
                  loading={isLoadingPayment}
                  onClick={handlePayment}
                >
                  Pay Now with{" "}
                  <img
                    src="https://www.computershopnepal.com/assets/khalti.png"
                    alt="img"
                    width={25}
                  />
                </Button>
                <Button
                  className="bg-red-500 hover:bg-red-600"
                  onClick={() => handleCancel()}
                  disabled={isCancelling || !roomBookingId}
                >
                  {isCancelling ? "Cancelling..." : "Cancel Booking"}
                </Button>
              </>
            ) : (
              <>
                <h2 className="text-lg text-emerald-600 font-semibold text-left">
                  Book today. Pay on arrival.
                </h2>

                {showDatePicker ? (
                  <div className="flex flex-col gap-3 p-3 border border-slate-200 rounded-md bg-white">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5 text-emerald-500" />
                      <label
                        htmlFor="startDate"
                        className="text-sm font-medium"
                      >
                        Select check-in date:
                      </label>
                    </div>
                    <input
                      type="date"
                      id="startDate"
                      className="p-2 border border-slate-200 rounded-md"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                    />
                    <Button
                      onClick={handleBooking}
                      className="bg-emerald-500 hover:bg-emerald-600 mt-2"
                      disabled={isBooking}
                    >
                      {isBooking ? "Booking..." : "Confirm Booking"}{" "}
                      <ArrowRight />
                    </Button>
                  </div>
                ) : isAuthenticated ? (
                  <Button
                    onClick={toggleDatePicker}
                    className="bg-emerald-500 hover:bg-emerald-600"
                  >
                    Book Now <ArrowRight />
                  </Button>
                ) : (
                  <Button
                    onClick={() => navigate("/login")}
                    className="bg-emerald-500 hover:bg-emerald-600"
                  >
                    Log in to Book Room <ArrowRight />
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
