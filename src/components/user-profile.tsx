"use client"

import { UserProfile as ClerkUserProfile } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { type Theme } from "@clerk/types"
import { useTheme } from "next-themes"

const appearance: Theme = {
  baseTheme: undefined,

}

export function UserProfile() {
  const { theme } = useTheme()

  return (
    <ClerkUserProfile
      appearance={{
        ...appearance,
        baseTheme: theme === "dark" ? dark : appearance.baseTheme,
        variables: {
          ...appearance.variables,
          colorBackground: theme === "light" ? "#fafafa" : undefined,
        },
      }}
    />
  )
}
