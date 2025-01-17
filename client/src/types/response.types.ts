export type TRoomResponse = {
    id: string;
    RoomNumber: string;
    Capacity: number;
    Status: "Available" | "Occupied";
    Type: "Single" | "Double" | "Triple";
    Description: string ;
    Price: number;
    FloorNumber: number;
    updatedAt: string;
    createdAt: string;
  };
  