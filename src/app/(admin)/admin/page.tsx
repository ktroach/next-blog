import type { Metadata } from "next";
import { env } from "@/env.mjs";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Icons } from "@/components/icons"
import { Header } from "@/components/header";
import { Shell } from "@/components/shells/shell";

import { AdminWelcome } from "@/components/admin/admin-welcome";
import { OrganizationList } from "@/components/admin/org-list";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Admin Dashboard",
  description: "Manage your Site",
}

export default function AdminPage() {
  return (
    <Shell variant="sidebar">
      <Header
        title="Admin Dashboard"
        description="Manage your Site"
        size="sm"
      />

      <div className="w-full overflow-hidden">
      <Alert>
        <Icons.terminal className="h-4 w-4" aria-hidden="true" />
        <AlertTitle><AdminWelcome /></AlertTitle>
        <AlertDescription>
          You are currently in the Admin Dashboard where you can manage the content and settings of your site and blogs. 
        </AlertDescription>
      </Alert>        
      </div>

      <OrganizationList />

    </Shell>
  )
}
