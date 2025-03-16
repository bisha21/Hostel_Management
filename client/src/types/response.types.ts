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

export type TComplaintResponse = {
  id: number;
  userId: number;
  roomId: number;
  description: string;
  status: "Pending" | "Completed";
  feedback: string;
  category: "Maintenance" | "Housekeeping"; 
  createdAt: string;
  updatedAt: string; 
};

// src/types/dining.ts
export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
export type MealType = 'breakfast' | 'lunch' | 'snacks' | 'dinner';

export interface MealItem {
  id: number;
  day: DayOfWeek;
  mealType: MealType;
  items: string[];
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface WeeklySchedule {
  [day: string]: {
    [mealType: string]: MealItem | null;
  };
}