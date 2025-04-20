import { Link, NavLink } from "react-router"; // Import useLocation for getting the current route
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

const items = [
  {
    title: "Home",
    url: "/student",
  },
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
    url: "/student/dining", // Added forward slash to make it a valid route
  },
  {
    title: "About",
    url: "/student/about",
  },
  {
    title: "Contact",
    url: "/student/contact",
  },
];

const Navbar = () => {
  const { user, logout } = useAuthContext();

  return (
    <nav className="bg-slate-50 border-slate-100">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink
          to="/student"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={logo} className="w-32" alt="Logo" />
        </NavLink>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <div
            className="flex text-sm bg-slate-100 rounded-full md:me-0 focus:ring-4 focus:ring-emerald-500"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
          >
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar src={user.profile_picture || ""} name={user.username} />
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
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-slate-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-slate-50 md:bg-slate-50">
            {items.map((item, index) => (
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
