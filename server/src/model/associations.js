import Room from "./RoomModal.js";
import Booking from "./bookingModel.js";

Room.hasMany(Booking, { foreignKey: "roomId", as: "bookings" });
Booking.belongsTo(Room, { foreignKey: "roomId", as: "room" });


export default { Room, Booking };
