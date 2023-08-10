import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { env } from "@/env.mjs"
import { allPosts } from "contentlayer/generated"
import dayjs from "dayjs"

import { formatDate } from "@/lib/utils"
import { Header } from "@/components/header"
import { Shell } from "@/components/shells/shell"

import { AdminBlogPosts } from "@/components/admin/blog-list";

export const ADMIN_BLOG_POSTS_TITLE = "Blog Posts"
export const ADMIN_BLOG_POSTS_DESCRIPTION = "Manage your Blog Posts"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: ADMIN_BLOG_POSTS_TITLE,
  description: ADMIN_BLOG_POSTS_DESCRIPTION,
}

export default function AdminBlogPage() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix()); 


  return (
    <Shell variant="sidebar">
      <Header
        title={ADMIN_BLOG_POSTS_TITLE}
        description={ADMIN_BLOG_POSTS_DESCRIPTION}
        size="sm"
      />
      <div className="w-full overflow-hidden">
        
      <AdminBlogPosts />


        <div className="my-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {posts.map((post, i) => (
            <Link key={post.slug} href={post.slug}>
              <article className="flex flex-col space-y-2.5">
                <h2 className="line-clamp-1 text-xl font-semibold">
                  {post.title}
                </h2>
                <p className="line-clamp-2 text-muted-foreground">
                  {post.description}
                </p>
                {post.date ? (
                  <p className="text-sm text-muted-foreground">
                    {formatDate(post.date)}
                  </p>
                ) : null}
              </article>
            </Link>
          ))}
        </div>
      </div>
    </Shell>
  )
}
