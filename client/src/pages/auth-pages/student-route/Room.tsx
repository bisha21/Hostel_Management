import { useEffect, useState } from "react";
import { Calendar, User, Clock, CheckCircle, BedDouble, FileWarning, AlarmClock } from "lucide-react";
import Filter from "./_components/room/Filter";
import RoomList from "./_components/room/RoomList";
import useAuthContext from "../../../hooks/useAuthContext";
import { useFetchRooms } from "../../../api/queries/room.query";
import { TRoomResponse } from "../../../types/response.types";
import MonthlyPaymentSection from "./_components/MonthlyPayment";
import useModalContext from "../../../hooks/useModalContext";

export default function Room() {
  const { user } = useAuthContext();
  const [isRoomConfirmed, setIsRoomConfirmed] = useState(false);
  const [userBooked, setUserBooked] = useState<TRoomResponse>({} as TRoomResponse);
  const {openModal}= useModalContext();
  
  const { data, isLoading, error } = useFetchRooms();
  
  useEffect(() => {
    const userBookedRoom = data?.data?.find((room:any) => 
      room.bookings.some((booking:any) => (booking.userId === user?.id && booking.status !== 'cancelled'))
    );
    
    if (userBookedRoom) {
      const isPaymentConfirmed = userBookedRoom.bookings.some((booking:any) => booking.status === 'confirmed');
      setIsRoomConfirmed(isPaymentConfirmed);
      setUserBooked(userBookedRoom);
    }
  }, [data, user]);
  
  const formatDate = (dateString:any) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Calculate days of stay for semester
  const calculateDuration = (startDate:string, endDate:string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return isRoomConfirmed && userBooked ? (
    <div className="w-full bg-[#141c24] min-h-screen">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h1 className="text-4xl text-[#c69963] font-medium">
            Your Hostel Room
          </h1>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button 
              onClick={()=>openModal({
                  key:"COMPLAINT",
                  initiatorName:userBooked.id,
              })}
              className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <FileWarning size={18} />
              <span>Report an Issue</span>
            </button>
            <button 
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <AlarmClock size={18} />
              <span>Request Room Cancellation</span>
            </button>
          </div>
        </div>

        
        <div className="bg-green-800/30 border border-green-600 rounded-lg p-4 mb-8 flex items-center gap-3">
          <CheckCircle className="text-green-500" size={24} />
          <p className="text-green-400 text-lg">Your room has been confirmed and payment has been processed. Welcome to your new accommodation!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="col-span-1 bg-[#1a2631] rounded-xl overflow-hidden shadow-xl h-fit">
            <div className="bg-[#c69963]/10 border-b border-[#c69963]/20 p-6">
              <h2 className="text-2xl text-[#c69963] font-medium flex items-center gap-2">
                <User size={24} />
                Student Information
              </h2>
            </div>
            <div className="p-6 text-slate-200 space-y-4">
              <div>
                <p className="text-slate-400 text-sm">Student Name</p>
                <p className="text-xl font-semibold">{user.username}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Student Type</p>
                <p className="text-xl font-semibold capitalize">{user.user_type}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Contact Number</p>
                <p className="text-xl font-semibold">{user.phone_number}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Home Address</p>
                <p className="text-xl font-semibold">{user.address}</p>
              </div>
              <div className="pt-4 border-t border-slate-700">
                <p className="text-slate-400 text-sm">Student ID</p>
                <p className="text-xl font-semibold">#{user.id}</p>
              </div>
            </div>
          </div>

          
          <div className="col-span-2 bg-[#1a2631] rounded-xl overflow-hidden shadow-xl">
            <div className="bg-[#c69963]/10 border-b border-[#c69963]/20 p-6">
              <h2 className="text-2xl text-[#c69963] font-medium flex items-center gap-2">
                <BedDouble size={24} />
                Room Details
              </h2>
            </div>
            <div className="p-6 text-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-slate-400 text-sm">Room Number</p>
                    <p className="text-xl font-semibold">{userBooked.RoomNumber}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Room Type</p>
                    <p className="text-xl font-semibold">{userBooked.Type}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Floor Number</p>
                    <p className="text-xl font-semibold">{userBooked.FloorNumber}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-slate-400 text-sm">Capacity</p>
                    <p className="text-xl font-semibold">{userBooked.Capacity} Student{userBooked.Capacity > 1 ? 's' : ''}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Booking Status</p>
                    <p className="text-xl font-semibold text-green-500">Confirmed</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Monthly Fee</p>
                    <p className="text-xl font-semibold">Rs.{userBooked.Price.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              {/* Booking Information */}
              <div className="mt-8 pt-8 border-t border-slate-700">
                <h3 className="text-xl text-[#c69963] mb-4">Accommodation Period</h3>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="text-[#c69963]" />
                    <div>
                      <p className="text-slate-400 text-sm">Check-in Date</p>
                      <p className="text-lg font-medium">{formatDate(userBooked.bookings[0].startDate)}</p>
                    </div>
                  </div>
                  <div className="h-px w-20 bg-slate-700 hidden md:block"></div>
                  <div className="flex items-center gap-3">
                    <Clock className="text-[#c69963]" />
                    <div>
                      <p className="text-slate-400 text-sm">Duration</p>
                      <p className="text-lg font-medium">
                        {calculateDuration(userBooked.bookings[0].startDate, userBooked.bookings[0].endDate)} Days
                      </p>
                    </div>
                  </div>
                  <div className="h-px w-20 bg-slate-700 hidden md:block"></div>
                  <div className="flex items-center gap-3">
                    <Calendar className="text-[#c69963]" />
                    <div>
                      <p className="text-slate-400 text-sm">Check-out Date</p>
                      <p className="text-lg font-medium">{formatDate(userBooked.bookings[0].endDate)}</p>
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-[#c69963]/10 rounded-lg p-4 mt-6">
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div>
                      <p className="text-slate-400 text-sm">Payment Status</p>
                      <p className="text-xl font-semibold text-green-500">
                        {userBooked.bookings[0].paymentStatus === 'confirmed' ? 'Confirmed' : 'Pending'}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">Booking Date</p>
                      <p className="text-xl font-semibold">{formatDate(userBooked.bookings[0].booking_date)}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">Total Amount Paid</p>
                      <p className="text-2xl font-bold text-[#c69963]">Rs. {parseFloat(userBooked.bookings[0].total_amount).toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                {/* Check-in Status
                <div className="mt-6 p-4 border border-slate-700 rounded-lg">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <p className="text-slate-400 text-sm">Check-in Status</p>
                      <p className="text-xl font-semibold">
                        {userBooked.bookings[0].check_in_completed ? 
                          <span className="text-green-500">Completed</span> : 
                          <span className="text-yellow-500">Pending</span>
                        }
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">Check-out Status</p>
                      <p className="text-xl font-semibold">
                        {userBooked.bookings[0].check_out_complete ? 
                          <span className="text-green-500">Completed</span> : 
                          <span className="text-yellow-500">Not yet</span>
                        }
                      </p>
                    </div>
                  </div>
                </div> */}
              </div>
              <div>
              <MonthlyPaymentSection booking={userBooked.bookings[0]}/>
              </div>
            </div>
          </div>
        </div>

        {/* Hostel Rules Section */}
        <div className="mt-8 bg-[#1a2631] rounded-xl overflow-hidden shadow-xl">
          <div className="bg-[#c69963]/10 border-b border-[#c69963]/20 p-6">
            <h2 className="text-2xl text-[#c69963] font-medium">Hostel Rules & Information</h2>
          </div>
          <div className="p-6 text-slate-200">
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle size={18} className="text-[#c69963] mt-1" />
                <span>Quiet hours are from 10:00 PM to 6:00 AM.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={18} className="text-[#c69963] mt-1" />
                <span>Keep your room and common areas clean.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={18} className="text-[#c69963] mt-1" />
                <span>Report any maintenance issues promptly using the "Report an Issue" button.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={18} className="text-[#c69963] mt-1" />
                <span>Visitors must sign in at the reception desk and leave by 8:00 PM.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={18} className="text-[#c69963] mt-1" />
                <span>Cancellation requests must be submitted at least 30 days before check-out.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full bg-[#141c24]">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <h1 className="text-4xl mb-5 text-[#c69963] font-medium">
          Our Luxury Room!
        </h1>
        <p className="text-slate-200 text-lg mb-10">
          Cozy yet luxurious cabins, located right in the heart of the Italian
          Dolomites. Imagine waking up to beautiful mountain views, spending your
          days exploring the dark forests around, or just relaxing in your private
          hot tub under the stars. Enjoy nature's beauty in your own little home
          away from home. The perfect spot for a peaceful, calm vacation. Welcome
          to paradise.
        </p>
      </div>
      <Filter />
      <RoomList data={data} isLoading={isLoading} error={error} />
    </div>
  );
}