import Room from "./RoomModal.js";
import Booking from "./bookingModel.js";
import Notification from "./notificationModel.js";
import User from "./userModal.js";

Room.hasMany(Booking, { foreignKey: "roomId", as: "bookings" });
Booking.belongsTo(Room, { foreignKey: "roomId", as: "room" });
User.hasMany(Notification, { foreignKey: "userId" });
Notification.belongsTo(User, { foreignKey: "userId" });

export default { Room, Booking, Notification, User };
