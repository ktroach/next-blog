import { type Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { env } from "@/env.mjs"
import { currentUser } from "@clerk/nextjs"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { AddBlogPostForm } from "@/components/forms/add-blog-post-form"
import { Shell } from "@/components/shells/shell"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Create Blog",
  description: "Create a new blog post",
}

export default async function AdminBlogNew() {
    const user = await currentUser();
    if (!user) redirect("/");

    return (
        <Shell className="max-w-lg111">
          <AddBlogPostForm />
          {/* <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Sign in</CardTitle>
              <CardDescription>
                Create a new blog post 
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <AddBlogPostForm />
            </CardContent>
          </Card> */}
        </Shell>
      )    
}