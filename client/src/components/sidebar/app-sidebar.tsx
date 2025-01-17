import { Codesandbox, Coffee, HandCoins, HandPlatter, Home, ScanEye, ShoppingBag, ShoppingBasket, Utensils, UtensilsCrossed } from "lucide-react"

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
import { useContext } from "react";
import { AuthContext } from "../../context/authContext.tsx";
// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Attendence",
    url: "#",
    icon: ScanEye,
  },
  {
    title: "Room Booking",
    url: "/room",
    icon: Codesandbox,
  },
  {
    title: "Payment",
    url: "#",
    icon: HandCoins,
  },
  {
    title: "Dining",
    url: "#",
    icon: UtensilsCrossed,
  },
]

export function AppSidebar() {
  const user=useContext(AuthContext)
  console.log("Hi i am from user",user);
  const {state} = useSidebar();
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
      </SidebarContent>
    </Sidebar>
  )
}
