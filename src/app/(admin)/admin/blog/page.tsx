/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */

import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { env } from "@/env.mjs"
import { type Post, allPosts } from "contentlayer/generated"
import dayjs from "dayjs"

import { humanizeDate } from "@/lib/utils"
import { Header } from "@/components/header"
import { Shell } from "@/components/shells/shell"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Icons } from "@/components/icons"

import { AdminBlogPosts } from "@/components/admin/blog-list"
import { CreateBlogButton } from "@/components/admin/create-blog-button"

import type { Blog } from "@/types"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Blog Posts", 
  description: "Manage your Blog Posts",
}

export default function AdminBlogPage() {
  const blogPosts: Blog[] = [];
  let mostRecentPosts: Post[] = [];

  const mapPosts = (posts: string | any[]) => {
    if (posts && posts.length > 0) {
      for (let i = 0; i < posts.length; i++) {
        const p = posts[i];
        if (p) {
          blogPosts.push({
            _id: p._id, 
            authors: p.authors, 
            title: p.title,
            description: p?.description,
            date: p.date, 
            published: p.published, 
            readingTime: p.readingTime, 
            slug: p.slug, 
            slugAsParams: p.slugAsParams
          });
        }
      }    
    }
  };

  // filters the posts that have been published
  // const posts = allPosts.filter((post) => post.published);
  const posts = allPosts && allPosts.length > 0 ? allPosts : [];
  // you need to check for null or empty array 
  if (posts && posts.length > 0) {
    // sorts by date posted 
    posts.sort((a, b) => (dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1));
    // sort descending
    posts.reverse();
    // slice the first 4 posts 
    mostRecentPosts = posts ? posts.slice(0, 4) : [];
    mapPosts(posts);
  }

  return (
    <Shell variant="sidebar">
      <Header
        title="Blog Posts"
        description="Manage your Blog Posts"
        size="sm"
      />
      <div className="w-full overflow-hidden">
        <CreateBlogButton />
        <h2 className="py-4 font-bold">Recent Posts</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {mostRecentPosts.map((post, i) => (
            <Link key={post.slug} href={post.slug}>
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
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {post.description}
                </p>
                {post.date ? (
                  <p className="text-sm text-muted-foreground">
                    {humanizeDate(post.date)}
                  </p>
                ) : null}
              </article>
            </Link>
          ))}
        </div>
        <h2 className="py-4 font-bold">All Posts</h2>        
        {blogPosts ? <AdminBlogPosts allPosts={blogPosts} /> : <></>}
      </div>
    </Shell>
  )
}
