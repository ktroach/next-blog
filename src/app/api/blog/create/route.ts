import { db } from "@/db"
import { blogPosts } from "@/db/schema"
// import { env } from "@/env.mjs"
import { currentUser } from "@clerk/nextjs"
import { eq } from "drizzle-orm"
import { z } from "zod"
import { blogSchema } from "@/lib/validations/blog"

export async function POST(req: Request) {
    const input = blogSchema.parse(await req.json());
    console.log(">>> users input parsed on server >>>> ", input);

    try {
        const user = await currentUser();

        const existingBlogPost = await db.query.blogPosts.findFirst({
            where: eq(blogPosts.title, input.title),
        });

        if (existingBlogPost) {
            console.log(">>> blog post already exists >>> ", existingBlogPost);
            return new Response(null, { status: 204 });
        }

        if (!existingBlogPost) {
            await db.insert(blogPosts).values({
                userId: user?.id,
                title: input.title,
                description: input.description,
                imageUrl: input.image,
                body: input.body,
                createdAt: new Date(),
            });
        }

        return new Response(null, { status: 204 });
    } catch (error) {
        console.error(error)

        if (error instanceof z.ZodError) {
            return new Response(error.message, { status: 422 })
        }

        if (error instanceof Error) {
            return new Response(error.message, { status: 500 })
        }

        return new Response("Something went wrong", { status: 500 })
    }
}
