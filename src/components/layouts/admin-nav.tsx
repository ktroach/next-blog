"use client"

import Link from "next/link"
import { useUser } from "@clerk/nextjs"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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

export function AdminNav() {
  const { isLoaded, isSignedIn, user } = useUser()

  // In case the user signs out while on the page.
  if (!isLoaded || !user) {
    return null;
  }

  return (
    <div>
      {isSignedIn ? (
        <NavigationMenu>
          <NavigationMenuList>
            <Link href="/admin" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  "h-auto bg-blue-500 text-white hover:bg-blue-300 text-sm"
                )}
              >
                <span className="pr-1">Admin</span>
                <Icons.user
                  className="scale-80 dark:scale-80 h-3 w-3 rotate-0 transition-all"
                  aria-hidden="true"
                />
              </NavigationMenuLink>
            </Link>
          </NavigationMenuList>
        </NavigationMenu>
      ) : (
        <></>
      )}
    </div>
  )
}
