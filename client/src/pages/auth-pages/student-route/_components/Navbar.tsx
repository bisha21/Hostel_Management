import { Link, NavLink, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import logo from "../../../../assets/image/logo3.png";
import { Avatar } from "../../../../components/reusables/avatar";
import useAuthContext from "../../../../hooks/useAuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";

import { Bell } from "lucide-react";
import { useFetchMyNotification } from "../../../../api/queries/notification.query";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../components/ui/popover";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";

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
}

// interface NavItem {
//   title: string;
//   url: string;
// }

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuthContext();
  const { data } = useFetchMyNotification({ isAuthenticated });
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const items = () => {
    if (isAuthenticated && user.user_type === "student") {
      return [
        {
          title: "Rooms",
          url: "/student/rooms",
        },
        {
          title: "Attendance",
          url: "/student/attendance",
        },
        {
          title: "Dining",
          url: "/student/dining",
        },
      ];
    }
    return [
      {
        title: "Home",
        url: "/",
      },
      {
        title: "Rooms",
        url: "/rooms",
      },
      {
        title: "About",
        url: "/about",
      },
      {
        title: "Contact",
        url: "/contact",
      },
    ];
  };

  useEffect(() => {
    if (data && data.data) {
      setNotifications(data.data);
    }
  }, [data]);

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

  return (
    <nav className="bg-slate-50 border-slate-100">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink
          to="/student"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={logo} className="w-32" alt="Logo" />
        </NavLink>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-3 rtl:space-x-reverse">
          {/* Notification Bell with Popover */}
          {isAuthenticated ? (
            <>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="p-2 rounded-full hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 relative">
                    <Bell className="w-5 h-5 text-slate-700" />
                    {notifications.length > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs text-white"
                      >
                        {notifications.length}
                      </Badge>
                    )}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="end">
                  <Card className="border-0 shadow-none">
                    <CardHeader className="py-2 px-4 bg-emerald-500 text-white font-semibold rounded-t-md flex justify-between items-center">
                      <span>Notifications</span>
                      <Badge
                        variant="outline"
                        className="bg-white text-emerald-800 hover:bg-white"
                      >
                        {notifications.length}
                      </Badge>
                    </CardHeader>
                    <CardContent className="p-0 max-h-96 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className="p-3 border-b hover:bg-slate-50 cursor-pointer"
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center gap-2">
                                    <Badge
                                      variant={getPriorityBadgeVariant(
                                        notification.priority,
                                      )}
                                    >
                                      {notification.type}
                                    </Badge>
                                  </div>
                                  <span className="text-xs text-slate-500">
                                    {formatNotificationTime(notification.time)}
                                  </span>
                                </div>
                                <p className="text-sm text-slate-700 mt-1">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-slate-500 mt-1">
                                  From: {notification.sentby}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-slate-500">
                          No notifications
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="py-2 px-4 bg-slate-50 rounded-b-md text-center">
                      <Link
                        to="/student/notifications"
                        className="w-full text-sm text-emerald-600 hover:text-emerald-800"
                      >
                        View all notifications
                      </Link>
                    </CardFooter>
                  </Card>
                </PopoverContent>
              </Popover>

              {/* User Avatar Dropdown */}
              <div
                className="flex text-sm bg-slate-100 rounded-full md:me-0 focus:ring-4 focus:ring-emerald-500"
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="user-dropdown"
                data-dropdown-placement="bottom"
              >
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar
                      src={user.profile_picture || ""}
                      name={user.username}
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="focus:bg-emerald-400">
                      <Link to={"/student/profile"}>My Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="focus:bg-emerald-400"
                      onClick={logout}
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </>
          ) : (
            <div className="flex gap-2">
              <Button onClick={() => navigate("/login")}>Login</Button>
              <Button
                variant={"outline"}
                className="hover:bg-emerald-600 hover:text-white"
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-slate-600 rounded-lg md:hidden hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Navigation links */}
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-slate-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-slate-50 md:bg-slate-50">
            {items().map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.url}
                  className={({ isActive }) =>
                    `block py-2 px-3 ${
                      isActive
                        ? "text-emerald-600 font-semibold"
                        : "text-slate-800 hover:text-emerald-500"
                    } md:p-0`
                  }
                  aria-current={item.title === "Home" ? "page" : undefined}
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
