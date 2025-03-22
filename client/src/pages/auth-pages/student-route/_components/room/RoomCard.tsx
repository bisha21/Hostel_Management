import { BookMarked, UsersIcon } from "lucide-react";
import { Link } from "react-router";

function RoomCard({ room }: { room: any }) {
  const { id, RoomNumber, Capacity, Status, Price } = room;

  return (
    <div className="flex border bg-slate-300">
      <div className="flex-1 relative">
        <img
          src="https://www.thehivehostels.com/uploads/images/1658301040_7796f3aa4d7819a2f5d5.jpeg"
          alt={`Cabin ${RoomNumber}`}
          className="flex-1 border-r border-slate-200 object-cover"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <div className="flex-grow">
        <div className="pt-5 pb-4 px-7 bg-slate-50">
          <h3 className="font-semibold text-2xl mb-3 text-slate-800">
            Cabin {RoomNumber}
          </h3>

          <div className="flex gap-3 items-center mb-2">
            <UsersIcon className="h-5 w-5 text-emerald-500" />
            <p className="text-lg text-slate-600">
              For up to <span className="font-bold">{Capacity}</span> guests
            </p>
          </div>

          <p className="flex gap-3 justify-end items-baseline text-emerald-600">
            Rs. {Price}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-slate-200 text-center bg-slate-50">
          <p className="flex gap-2 items-center justify-center ml-7 text-slate-600">
            <BookMarked className="text-emerald-500" />
            <span>{Status}</span>
          </p>
          <Link
            to={`/student/rooms/${id}`}
            className="border-l border-slate-200 py-4 px-6 inline-block hover:bg-sky-300 transition-all hover:text-slate-800"
          >
            Details & booking &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RoomCard;
