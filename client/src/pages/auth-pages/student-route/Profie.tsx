import { Camera, Edit2, Mail, MapPin, Phone, User } from "lucide-react";
import { useFetchUser } from "../../../api/queries/user.query";
import useModalContext from "../../../hooks/useModalContext";

const ProfilePage = () => {
  const { data } = useFetchUser();
  const { openModal } = useModalContext();
  const user = data?.data;
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Header/Cover Section */}
          <div className="h-32 bg-emerald-500"></div>

          {/* Profile Info Section */}
          <div className="px-6 py-8">
            {/* Profile Picture */}
            <div className="relative -mt-20 mb-6">
              <div className="w-24 h-24 rounded-full border-4 border-white bg-slate-100 flex items-center justify-center overflow-hidden">
                {user?.profile_picture ? (
                  <img
                    src={user?.profile_picture || ""}
                    alt={user?.username}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-12 h-12 text-slate-400" />
                )}
              </div>
              <button
                title="Edit profile picture"
                className="absolute bottom-0 left-16 p-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 hover:bg-sky-300 transition-colors"
              >
                <Camera className="w-4 h-4" />
              </button>
              <button
                title="Edit profile details"
                className="absolute bottom-0 right-0 p-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 hover:bg-sky-300 transition-colors"
                onClick={() =>
                  openModal({
                    key: "EDIT_PROFILE",
                    data: {
                      username: user?.username,
                      address: user?.address,
                      phone: user?.phone_number,
                    },
                  })
                }
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </div>

            {/* User Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-slate-800">
                  {user?.username}
                </h1>
                <p className="text-emerald-600 font-medium">
                  {user?.user_type}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-600">
                  <Mail className="w-5 h-5 text-emerald-500" />
                  <span>{user?.email}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Phone className="w-5 h-5 text-emerald-500" />
                  <span>{user?.phone_number}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <MapPin className="w-5 h-5 text-emerald-500" />
                  <span>{user?.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking History */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-6">
            Booking History
          </h2>
          <div className="space-y-4">
            {user?.bookings?.map((booking: any) => (
              <div
                key={booking.id}
                className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-slate-800">
                      Room {booking.Room.RoomNumber}
                    </h3>
                    <p className="text-slate-600">Type: {booking.Room.Type}</p>
                    <p className="text-slate-600">
                      Amount: Rs. {booking.total_amount}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      booking.status === "confirmed"
                        ? "bg-emerald-100 text-emerald-600"
                        : booking.status === "cancelled"
                          ? "bg-red-100 text-red-600"
                          : "bg-sky-100 text-sky-600"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
