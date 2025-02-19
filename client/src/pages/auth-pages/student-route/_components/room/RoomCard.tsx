import { BookMarked, UsersIcon } from 'lucide-react';
import { TRoomResponse } from '../../../../../types/response.types';
import { Link } from 'react-router';

function RoomCard({ room }:any) {
  const {
    id,
    RoomNumber,
    Capacity,
    Status,
    Price,
  } = room;

  return (
    <div className="flex border-teal-900 ">
      <div className="flex-1 relative">
        <img
          src="https://www.thehivehostels.com/uploads/images/1658301040_7796f3aa4d7819a2f5d5.jpeg"
          alt={`Cabin ${RoomNumber}`}
          className="flex-1 border-r border-primary-800 object-cover"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      <div className="flex-grow">
        <div className="pt-5 pb-4 px-7 bg-teal-950">
          <h3 className=" font-semibold text-2xl mb-3 text-[#c69963]">Cabin {RoomNumber}</h3>

          <div className="flex gap-3 items-center mb-2">
            <UsersIcon className="h-5 w-5 text-teal-600" />
            <p className="text-lg text-teal-200">
              For up to <span className="font-bold">{Capacity}</span> guests
            </p>
          </div>

          <p className="flex gap-3 justify-end items-baseline">${Price}</p>
        </div>

        <div className=" flex  items-center justify-between border-t border-teal-800 text-center  bg-teal-950">
          <p className='flex gap-2 items-center justify-center ml-7'>
            <BookMarked/> 
            <span >{Status}</span>
          </p>
          <Link
            to={`/student/rooms/${id}`}
            className="border-l border-teal-800 py-4 px-6 inline-block hover:bg-orange-300 transition-all hover:text-teal-900"
          >
            Details & booking &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RoomCard;
