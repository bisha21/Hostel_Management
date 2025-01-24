import { useFetchRooms } from '../../../../../api/queries/room.query';
import RoomCard from './RoomCard';
import { TRoomResponse } from '../../../../../types/response.types';
import Spinner from '../Spinner';
import { useSearchParams } from 'react-router';

const RoomList = () => {
  const { data: room, isLoading, error } = useFetchRooms();
  const [searchParams] = useSearchParams();

  // Get the 'filter' query parameter
  const filter = searchParams.get('filter') || 'all';

  if (isLoading) {
    return (
      <p className="text-center mx-auto">
        <Spinner />
      </p>
    );
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

  // Filter rooms based on the 'filter' parameter
  const filteredRooms = room.data.filter((room: TRoomResponse) => {
    if (filter === 'all') return true; 
    return room.Status === filter; 
  });

  // Check if there are no rooms after filtering
  if (!filteredRooms.length) {
    return <p className="text-teal-200 mt-10">No rooms match the filter criteria.</p>;
  }

  return (
    <div
      className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14 text-teal-200 mt-10 max-w-7xl mx-auto"
    >
      {filteredRooms.map((room: TRoomResponse) => (
        <RoomCard room={room} key={room.id} />
      ))}
    </div>
  );
};

export default RoomList;
