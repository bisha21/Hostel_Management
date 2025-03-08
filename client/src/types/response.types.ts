export type TRoomResponse = {
  id: string;
  RoomNumber: string;
  Capacity: number;
  Status: 'Available' | 'Occupied';
  Type: 'Single' | 'Double' | 'Triple';
  Description: string;
  Price: number;
  FloorNumber: number;
  updatedAt: string;
  createdAt: string;
  bookings: any[];
};

export type TBookingsResponse = {
  id: string;
  userId: number;
  roomId: number;
  status: 'pending' | 'confirmed' | 'cancelled' ; 
  total_amount: string; 
  booking_date: string;
  check_in_completed: boolean;
  check_out_complete: boolean;
  cancellation_reason: string | null; 
};
