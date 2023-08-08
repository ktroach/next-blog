import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { env } from "@/env.mjs"
import { currentUser } from "@clerk/nextjs"

import { Header } from "@/components/header"
import { Shell } from "@/components/shells/shell"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Admin",
  description: "Admin Page",
}

export default async function AdminPage() {
  const user = await currentUser()

  if (!user) {
    redirect("/signin")
  }

  return (
    <Shell variant="sidebar">
      <Header
        title="Admin"
        description="Admin Page"
        size="sm"
      />
      <div>Put Stuff HERE</div>
    </Shell>
  )
}
