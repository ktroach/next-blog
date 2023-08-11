import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { env } from "@/env.mjs"
import { allPosts } from "contentlayer/generated"
import dayjs from "dayjs"

import { formatDate } from "@/lib/utils"
import { Header } from "@/components/header"
import { Shell } from "@/components/shells/shell"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Icons } from "@/components/icons"

import { AdminBlogPosts } from "@/components/admin/blog-list";
import { CreateBlogButton } from "@/components/admin/create-blog-button";

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
    .sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix()).slice(0, 4); 


  return (
    <Shell variant="sidebar">
      <Header
        title={ADMIN_BLOG_POSTS_TITLE}
        description={ADMIN_BLOG_POSTS_DESCRIPTION}
        size="sm"
      />
      <div className="w-full overflow-hidden">
        <CreateBlogButton  />
        <h2 className="py-4 font-bold">Recent Posts</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {posts.map((post, i) => (
            <Link key={post.slug} href="#">
              <article className="flex flex-col space-y-2.5">
                <AspectRatio ratio={2}>
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(min-width: 1024px) 384px, (min-width: 768px) 288px, (min-width: 640px) 224px, 100vw"
                      className="rounded-lg object-cover"
                      priority={i <= 1}
                    />
                  ) : (
                    <div
                      aria-label="Placeholder"
                      role="img"
                      aria-roledescription="placeholder"
                      className="flex h-full w-full items-center justify-center rounded-lg bg-secondary"
                    >
                      <Icons.placeholder
                        className="h-9 w-9 text-muted-foreground"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                </AspectRatio>
                <h5 className="line-clamp-1 font-semibold">
                  {post.title}
                </h5>
                <p className="line-clamp-2 text-muted-foreground text-sm">
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
        <h2 className="py-4 font-bold">All Posts</h2>        
        <AdminBlogPosts allPosts={allPosts} />
      </div>
    </Shell>
  )
}
