import { useState } from "react";

import {
  LineChart,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  Pie,
  Label,
} from "recharts";
import { Users, Home, Calendar, CreditCard, Check } from "lucide-react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Badge } from "../../../components/ui/badge";

import { Button } from "../../../components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@radix-ui/react-dialog";
import { DialogHeader, DialogFooter } from "../../../components/ui/dialog";
import { useFetchStudents } from "../../../api/queries/student.query";
import { useFetchRooms } from "../../../api/queries/room.query";
import { useFetchBookings } from "../../../api/queries/booking.query";
import { useFetchPayments } from "../../../api/queries/payment";
import { useFetchComplaints } from "../../../api/queries/complaints.query";
import { format } from "date-fns";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
  const [complaintDialogOpen, setComplaintDialogOpen] = useState(false);
  const { data: studentsData } = useFetchStudents();
  const { data: roomsData } = useFetchRooms();
  const { data: bookingsData } = useFetchBookings();
  const { data: paymentsData } = useFetchPayments();
  const { data: complaintsData } = useFetchComplaints();

  const statusDistribution = [
    {
      name: "Confirmed",
      value: bookingsData?.data.filter((b: any) => b.status === "confirmed").length,
    },
    {
      name: "Pending",
      value: bookingsData?.data.filter((b: any) => b.status === "pending").length,
    },
  ];

  const payments = paymentsData?.data;
  const bookings = bookingsData?.data;
  const revenueMap: Record<string, number> = {};
  console.log(bookings);
  payments?.forEach((payment: any) => {
    if (payment.status === "success") {
      const date = new Date(payment.paymentDate);
      const month = format(date, "MMM"); // "Mar", "Apr", etc.

      if (!revenueMap[month]) {
        revenueMap[month] = 0;
      }

      revenueMap[month] += payment.amount;
    }
  });
  bookings?.forEach((booking: any) => {
    if (booking.status === "confirmed" && booking.paymentStatus === "pending") {
      const date = new Date(booking.booking_date);
      const month = format(date, "MMM"); // "Mar", "Apr", etc.

      if (!revenueMap[month]) {
        revenueMap[month] = 0;
      }
      const amount = booking.total_amount;
      revenueMap[month] += Number(amount);
    }
  });
  const revenueData = Object.entries(revenueMap).map(([month, amount]) => ({
    month,
    amount,
  }));

  const occupancyRate = [
    {
      name: "Occupied",
      value: roomsData?.data?.filter((room: any) =>
        room?.bookings?.some(
          (booking: any) =>
            booking.status === "confirmed" &&
            new Date(booking.startDate) <= new Date() &&
            new Date(booking.endDate) >= new Date(),
        ),
      ).length,
    },
    {
      name: "Available",
      value:
        roomsData?.data?.length -
        roomsData?.data?.filter((room: any) =>
          room?.bookings.some(
            (booking: any) =>
              booking.status === "confirmed" &&
              new Date(booking.startDate) <= new Date() &&
              new Date(booking.endDate) >= new Date(),
          ),
        ).length,
    },
  ];
  // Function to get student name by ID
  const getStudentName = (userId: any) => {
    const student = studentsData.find((s: any) => s.id === userId);
    return student ? student.username : "Unknown";
  };

  // Function to get room number by ID
  const getRoomNumber = (roomId: any) => {
    const room = roomsData?.find((r: any) => r.id === roomId);
    return room ? room.RoomNumber : "Unknown";
  };

  // Format date
  const formatDate = (dateString: any) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Handle complaint selection for details
  const handleComplaintClick = (complaint: any) => {
    setSelectedComplaint(complaint);
    setComplaintDialogOpen(true);
  };
  const totalRevenue = revenueData.reduce((acc, item) => acc + item.amount, 0);

  return (
    <div className="flex flex-col min-h-screen ">
      {/* Header */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-6 flex-1">
        <Tabs
          defaultValue="overview"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Students
                  </CardTitle>
                  <Users className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {studentsData?.length}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Available Rooms
                  </CardTitle>
                  <Home className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {roomsData?.data?.length}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Bookings
                  </CardTitle>
                  <Calendar className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {bookingsData?.data?.length}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                  <CreditCard className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalRevenue}</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Booking Status Distribution</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {statusDistribution.map((_entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Revenue</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="amount"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Room Occupancy</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={occupancyRate}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {occupancyRate.map((_entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Recent Complaints</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {complaintsData?.data?.map((complaint: any) => (
                        <TableRow
                          key={complaint.id}
                          className="cursor-pointer"
                          onClick={() => handleComplaintClick(complaint)}
                        >
                          <TableCell>
                            {getStudentName(complaint?.userId)}
                          </TableCell>
                          <TableCell>{complaint?.category}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                complaint?.status === "Pending"
                                  ? "outline"
                                  : "default"
                              }
                            >
                              {complaint?.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {formatDate(complaint?.createdAt)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          © 2025 Hostel Management System. All rights reserved.
        </div>
      </footer>

      {/* Complaint Details Dialog */}
      <Dialog open={complaintDialogOpen} onOpenChange={setComplaintDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complaint Details</DialogTitle>
            <DialogDescription>
              Complaint #{selectedComplaint?.id} from{" "}
              {selectedComplaint
                ? getStudentName(selectedComplaint.userId)
                : ""}
            </DialogDescription>
          </DialogHeader>
          {selectedComplaint && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs">Category</Label>
                  <p className="font-medium">{selectedComplaint.category}</p>
                </div>
                <div>
                  <Label className="text-xs">Status</Label>
                  <div>
                    <Badge
                      variant={
                        selectedComplaint.status === "Pending"
                          ? "outline"
                          : "default"
                      }
                    >
                      {selectedComplaint.status}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className="text-xs">Room</Label>
                  <p className="font-medium">
                    {getRoomNumber(selectedComplaint.roomId)}
                  </p>
                </div>
                <div>
                  <Label className="text-xs">Date</Label>
                  <p className="font-medium">
                    {formatDate(selectedComplaint.createdAt)}
                  </p>
                </div>
              </div>

              <div>
                <Label className="text-xs">Description</Label>
                <p className="mt-1 text-sm">{selectedComplaint.description}</p>
              </div>

              <div>
                <Label className="text-xs">Feedback</Label>
                <p className="mt-1 text-sm">{selectedComplaint.feedback}</p>
              </div>

              <div className="border-t pt-4">
                <Label className="mb-2">Update Status</Label>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    Mark as In Progress
                  </Button>
                  <Button className="flex-1">
                    <Check className="h-4 w-4 mr-2" />
                    Mark as Resolved
                  </Button>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="sm:justify-start">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setComplaintDialogOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
