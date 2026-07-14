import { Room } from "./Room.js";
import { Booking } from "./Booking.js";
import { Notification } from "./Notification.js";
import { User } from "./User.js";

Room.hasMany(Booking, { foreignKey: "roomId", as: "bookings" });
Booking.belongsTo(Room, { foreignKey: "roomId", as: "room" });
User.hasMany(Notification, { foreignKey: "userId" });
Notification.belongsTo(User, { foreignKey: "userId" });

export default { Room, Booking, Notification, User };
