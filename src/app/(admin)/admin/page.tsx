import type { Metadata } from "next";
import { env } from "@/env.mjs";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Icons } from "@/components/icons"
import { Header } from "@/components/header";
import { Shell } from "@/components/shells/shell";

import { OrganizationList } from "@/components/admin/org-list";
import { currentUser } from "@clerk/nextjs";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Admin Dashboard",
  description: "Manage your Site",
}

export default async function AdminPage() {
  const user = await currentUser()
  console.log(">>>> admin page >> user >>>> ", user)

  const email =
    user?.emailAddresses?.find((e) => e.id === user.primaryEmailAddressId)
      ?.emailAddress ?? "";

  console.log(">>>> admin page >>>>  user email >>> ", email);

  const firstName = user?.firstName ? user.firstName : "" ;
  console.log(">>>> admin page >>>>  first name >>> ", firstName);

  return (
    <Shell variant="sidebar">
      <Header
        title="Admin Dashboard"
        description="Manage your Site"
        size="sm"
      />

      <div className="w-full overflow-hidden">
      <Alert>
        {/* <Icons.terminal className="h-4 w-4" aria-hidden="true" /> */}
        <AlertTitle>Welcome, {firstName}!</AlertTitle>
        <AlertDescription>
          You are currently in the Admin Dashboard where you can manage the content and settings of your site. 
        </AlertDescription>
      </Alert>        
      </div>

      <OrganizationList />

    </Shell>
  )
}
