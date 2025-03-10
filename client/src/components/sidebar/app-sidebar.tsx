import { BookmarkCheck,Users, HandCoins, Home, LogOut, ScanEye, UtensilsCrossed, Vault } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar.tsx"

import {HORIZONTAL_LOGO, LOGO } from "../../constants/images.ts"
import { cn } from "../../lib/utils.ts";
import { Link } from "react-router";
import useAuthContext from "../../hooks/useAuthContext.tsx";
// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Students",
    url: "/students",
    icon: Users,
  },
  {
    title: "Attendence",
    url: "/attendance",
    icon: ScanEye,
  },
  {
    title: "Rooms",
    url: "/room",
    icon: Vault,
  },
  {
    title: "Bookings",
    url: "/bookings",
    icon: BookmarkCheck,
  },
  {
    title: "Payment",
    url: "/payment",
    icon: HandCoins,
  },
  {
    title: "Notification Panel",
    url: "/notification",
    icon: HandCoins,
  },
  {
    title: "Dining",
    url: "/dining",
    icon: UtensilsCrossed,
  },
]

export function AppSidebar() {
  const {state} = useSidebar();
  const {logout} = useAuthContext();
  const handleLogout = () => {
    if (logout) {
      logout();
    }
  };
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className={cn(state === "collapsed" ? "" : "flex items-center justify-center")}>
        <img src={state === "collapsed" ? LOGO : HORIZONTAL_LOGO} alt="logo" className={cn(state === "collapsed" ? "w-16" : "w-8/12")}/>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="mt-auto mb-4 mx-3">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleLogout}>
                <LogOut />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
