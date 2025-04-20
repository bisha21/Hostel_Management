import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  X,
  Check,
  Clock,
  Bell,
  AlertTriangle,
  Info,
  Search,
} from "lucide-react";
import { useFetchMyNotification } from "../../../api/queries/notification.query";
import { Button } from "../../../components/ui/button";

import { Card, CardContent } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import { Badge } from "../../../components/ui/badge";

// Define types
interface Notification {
  id: number;
  userId: number;
  message: string;
  time: string;
  type: string;
  priority: "HighPriority" | "MediumPriority" | "LowPriority";
  sentby: string;
  createdAt: string;
  updatedAt: string;
  isRead?: boolean; // Optional field that could be added in the future
}

// Mock API function for marking notifications as read
// In a real app, this would be a proper API call
const markAsRead = async (id: number): Promise<void> => {
  console.log(`Marking notification ${id} as read`);
  // In a real implementation, this would call your API
  return Promise.resolve();
};

const NotificationsPage = () => {
  const { data } = useFetchMyNotification();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filteredNotifications, setFilteredNotifications] = useState<
    Notification[]
  >([]);
  const [currentTab, setCurrentTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [priorityFilter, setPriorityFilter] = useState<string[]>([]);
  const [typeFilter, setTypeFilter] = useState<string[]>([]);
  const [timeFilter, setTimeFilter] = useState<string>("all");
  const [senderFilter, setSenderFilter] = useState<string[]>([]);

  // Process fetched data
  useEffect(() => {
    if (data && data.data) {
      // Add isRead field (this would come from your API in a real implementation)
      const processedData = data.data.map((notif: Notification) => ({
        ...notif,
        isRead: false, // Assuming all are unread initially
      }));
      setNotifications(processedData);
      setFilteredNotifications(processedData);
    }
  }, [data]);

  // Filter notifications whenever filters change
  useEffect(() => {
    let result = [...notifications];

    // Filter by tab
    if (currentTab === "unread") {
      result = result.filter((notif) => !notif.isRead);
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (notif) =>
          notif.message.toLowerCase().includes(query) ||
          notif.sentby.toLowerCase().includes(query) ||
          notif.type.toLowerCase().includes(query),
      );
    }

    // Filter by priority
    if (priorityFilter.length > 0) {
      result = result.filter((notif) =>
        priorityFilter.includes(notif.priority),
      );
    }

    // Filter by type
    if (typeFilter.length > 0) {
      result = result.filter((notif) => typeFilter.includes(notif.type));
    }

    // Filter by time
    if (timeFilter !== "all") {
      const now = new Date();
      const dayStart = new Date(now.setHours(0, 0, 0, 0));
      const weekStart = new Date(now);
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());

      result = result.filter((notif) => {
        const notifDate = new Date(notif.time);
        if (timeFilter === "today") {
          return notifDate >= dayStart;
        } else if (timeFilter === "week") {
          return notifDate >= weekStart;
        }
        return true;
      });
    }

    // Filter by sender
    if (senderFilter.length > 0) {
      result = result.filter((notif) => senderFilter.includes(notif.sentby));
    }

    setFilteredNotifications(result);
  }, [
    notifications,
    currentTab,
    searchQuery,
    priorityFilter,
    typeFilter,
    timeFilter,
    senderFilter,
  ]);

  // Get unique values for filters
  const uniquePriorities = [
    ...new Set(notifications.map((notif) => notif.priority)),
  ];
  const uniqueTypes = [...new Set(notifications.map((notif) => notif.type))];
  const uniqueSenders = [
    ...new Set(notifications.map((notif) => notif.sentby)),
  ];

  // Format notification time
  const formatNotificationTime = (timeString: string): string => {
    const date = new Date(timeString);
    return date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      month: "short",
      day: "numeric",
    });
  };

  // Handle marking a notification as read
  const handleMarkAsRead = async (id: number) => {
    await markAsRead(id);
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif,
      ),
    );
  };

  // Get badge variant based on priority
  const getPriorityBadgeVariant = (
    priority: string,
  ): "default" | "destructive" | "secondary" | "outline" => {
    switch (priority) {
      case "HighPriority":
        return "destructive";
      case "MediumPriority":
        return "default";
      default:
        return "secondary";
    }
  };

  // Get icon for notification type
  const getNotificationIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "alert":
        return <AlertTriangle className="w-4 h-4" />;
      case "info":
        return <Info className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setPriorityFilter([]);
    setTypeFilter([]);
    setTimeFilter("all");
    setSenderFilter([]);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Notifications</h1>
        <Button
          variant="outline"
          onClick={resetFilters}
          className="flex items-center gap-2"
        >
          <X className="w-4 h-4" />
          Clear filters
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                className="pl-10"
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e: any) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Priority
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Filter by Priority</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {uniquePriorities.map((priority) => (
                    <DropdownMenuCheckboxItem
                      key={priority}
                      checked={priorityFilter.includes(priority)}
                      onCheckedChange={(checked: any) => {
                        if (checked) {
                          setPriorityFilter([...priorityFilter, priority]);
                        } else {
                          setPriorityFilter(
                            priorityFilter.filter((p) => p !== priority),
                          );
                        }
                      }}
                    >
                      <Badge
                        variant={getPriorityBadgeVariant(priority)}
                        className="mr-2"
                      >
                        {priority.replace("Priority", "")}
                      </Badge>
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Type
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {uniqueTypes.map((type) => (
                    <DropdownMenuCheckboxItem
                      key={type}
                      checked={typeFilter.includes(type)}
                      onCheckedChange={(checked: any) => {
                        if (checked) {
                          setTypeFilter([...typeFilter, type]);
                        } else {
                          setTypeFilter(typeFilter.filter((t) => t !== type));
                        }
                      }}
                    >
                      <div className="flex items-center gap-2">
                        {getNotificationIcon(type)}
                        {type}
                      </div>
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Time
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Filter by Time</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setTimeFilter("all")}>
                    {timeFilter === "all" && <Check className="w-4 h-4 mr-2" />}
                    All time
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTimeFilter("today")}>
                    {timeFilter === "today" && (
                      <Check className="w-4 h-4 mr-2" />
                    )}
                    Today
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTimeFilter("week")}>
                    {timeFilter === "week" && (
                      <Check className="w-4 h-4 mr-2" />
                    )}
                    This week
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Sender
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Filter by Sender</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {uniqueSenders.map((sender) => (
                    <DropdownMenuCheckboxItem
                      key={sender}
                      checked={senderFilter.includes(sender)}
                      onCheckedChange={(checked: any) => {
                        if (checked) {
                          setSenderFilter([...senderFilter, sender]);
                        } else {
                          setSenderFilter(
                            senderFilter.filter((s) => s !== sender),
                          );
                        }
                      }}
                    >
                      {sender}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="mb-6">
        <TabsList className="w-full sm:w-auto mb-4">
          <TabsTrigger value="all" className="flex-1">
            All
            <Badge variant="secondary" className="ml-2">
              {notifications.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="unread" className="flex-1">
            Unread
            <Badge variant="secondary" className="ml-2">
              {notifications.filter((n) => !n.isRead).length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          {renderNotifications()}
        </TabsContent>

        <TabsContent value="unread" className="mt-0">
          {renderNotifications()}
        </TabsContent>
      </Tabs>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            className="px-4 bg-emerald-500 text-white hover:bg-emerald-600"
          >
            1
          </Button>
          <Button variant="outline" className="px-4">
            2
          </Button>
          <Button variant="outline" size="icon">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  // Helper function to render notifications
  function renderNotifications() {
    if (filteredNotifications.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <Bell className="w-12 h-12 text-slate-300 mb-4" />
          <h3 className="text-xl font-medium text-slate-800">
            No notifications found
          </h3>
          <p className="text-slate-500">
            {searchQuery ||
            priorityFilter.length > 0 ||
            typeFilter.length > 0 ||
            timeFilter !== "all" ||
            senderFilter.length > 0
              ? "Try adjusting your filters to see more results"
              : "You don't have any notifications yet"}
          </p>
          {(searchQuery ||
            priorityFilter.length > 0 ||
            typeFilter.length > 0 ||
            timeFilter !== "all" ||
            senderFilter.length > 0) && (
            <Button variant="outline" onClick={resetFilters} className="mt-4">
              Clear all filters
            </Button>
          )}
        </div>
      );
    }

    return filteredNotifications.map((notification) => (
      <Card
        key={notification.id}
        className={`mb-4 ${notification.isRead ? "bg-white" : "bg-slate-50 border-l-4 border-l-emerald-500"}`}
      >
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant={getPriorityBadgeVariant(notification.priority)}>
                  {notification.type}
                </Badge>
                <span className="text-sm text-slate-500">
                  {formatNotificationTime(notification.time)}
                </span>
              </div>
              <p className="text-slate-800 mb-2">{notification.message}</p>
              <div className="flex items-center text-sm text-slate-500">
                <span>From: {notification.sentby}</span>
              </div>
            </div>
            <div className="flex sm:flex-col gap-2 self-end sm:self-center">
              {!notification.isRead && (
                <Button
                  variant="outline"
                  size="sm"
                  className="text-emerald-600 border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                  onClick={() => handleMarkAsRead(notification.id)}
                >
                  Mark as read
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    ));
  }
};

export default NotificationsPage;
