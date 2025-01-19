import { useFetchRooms } from '../../../../../api/queries/room.query';
import RoomCard from './RoomCard';
import { TRoomResponse } from '../../../../../types/response.types';
import Spinner from '../Spinner';

const RoomList = () => {
  const { data: room, isLoading, error } = useFetchRooms();

  if (isLoading) {
    return <p className="text-center mx-auto">
        <Spinner/>
    </p>;
  }

  if (error) {
    return (
      <p className="text-red-500 mt-10">
        Failed to load rooms. Please try again later.
      </p>
    );
  }

  if (!room || !room.data.length) {
    return <p className="text-teal-200 mt-10">No rooms available.</p>;
  }

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14 text-teal-200 mt-10 max-w-7xl mx-auto
    ">
      {room.data.map((room: TRoomResponse) => (
        <RoomCard room={room} key={room.id} />
      ))}
    </div>
  );
};

export default RoomList;
