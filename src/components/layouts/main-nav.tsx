"use client"

import * as React from "react"
import Link from "next/link"
import type { MainNavItem } from "@/types"

// import { useAuth } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Icons } from "@/components/icons"

interface MainNavProps {
  items?: MainNavItem[]
}

export function MainNav({ items }: MainNavProps) {
  // const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { isLoaded, isSignedIn, user } = useUser();

  // In case the user signs out while on the page.
  if (!isLoaded || !user) {
    
  }
  console.log(">>>> main-nav >>> user >>>> ", user)


  return (
    <div className="hidden gap-6 lg:flex">
      <Link
        aria-label="Home"
        href="/"
        className="hidden items-center lg:flex"
      >
        <Icons.product className="h-6 w-6" aria-hidden="true" />
        <span className="hidden font-bold lg:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
        {/* <NavigationMenuItem>
          <NavigationMenuTrigger className="h-auto">
           Admin
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                <ListItem
                  key="admin1"
                  title="1"
                  href="#"
                >
                  1 description
                </ListItem>
                <ListItem
                  key="admin2"
                  title="2"
                  href="#"
                >
                  2 description
                </ListItem>                
            </ul>
          </NavigationMenuContent>          
        </NavigationMenuItem> */}
        <NavigationMenuItem key="blog-nav">
          <Link href="/blog" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(navigationMenuTriggerStyle(), "h-auto")}
            >
              Blog
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>   
        {/* <NavigationMenuItem key="admin-nav">
          <Link href="/admin" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(navigationMenuTriggerStyle(), "h-auto")}
            >
              Admin
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>                 */}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={String(href)}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
