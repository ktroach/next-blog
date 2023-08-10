import { type SidebarNavItem } from "@/types"

export interface AdminConfig {
  sidebarNav: SidebarNavItem[]
}

export const adminConfig: AdminConfig = {
  sidebarNav: [
    {
      title: "Dashboard",
      href: "/admin",
      icon: "chart",
      items: [],
    },      
    {
      title: "Pages",
      href: "/admin/pages",
      icon: "placeholder",
      items: [],
    },    
    {
      title: "Blog Posts",
      href: "/admin/blog",
      icon: "edit",
      items: [],
    },
    {
      title: "Images & Files",
      href: "/admin/storage",
      icon: "upload",
      items: [],
    }, 
    {
      title: "Users",
      href: "/admin/users",
      icon: "user",
      items: [],
    }, 
    {
      title: "Analytics",
      href: "/admin/analytics",
      icon: "terminal",
      items: [],
    },  
    {
      title: "Donations",
      href: "/admin/donations",
      icon: "dollarSign",
      items: [],
    },                   
    {
      title: "Settings",
      href: "/admin/settings",
      icon: "settings",
      items: [],
    }, 
  ],
}
