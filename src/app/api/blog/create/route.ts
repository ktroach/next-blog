import { db } from "@/db"
import { blogPosts } from "@/db/schema"
// import { env } from "@/env.mjs"
import { currentUser } from "@clerk/nextjs"
import { eq } from "drizzle-orm"
import { z } from "zod"
import { blogSchema } from "@/lib/validations/blog"
import { writeFileSync } from "fs"
import generateUniqueFilename from './fileUtils';
import { generateFormattedDate } from './dateUtils';
import { generateMDXFrontmatter } from "./mdxUtils"
import { spawnProcess } from "./processUtils"

export async function POST(req: Request) {
    const data = blogSchema.parse(await req.json());
    console.log(">>> users input parsed on server >>>> ", data);

    try {
        const user = await currentUser();

        const existingBlogPost = await db.query.blogPosts.findFirst({
            where: eq(blogPosts.title, data.title),
        });

        if (existingBlogPost) {
            console.log(">>> blog post already exists >>> ", existingBlogPost);
            return new Response(null, { status: 204 });
        }

        if (!existingBlogPost) {
            // write the MDX file to the server 
            
            // auto-generate an image using ai apis to use for default images 

            // TODO - Fix authors
            // generate a date 
            const mdxDate = generateFormattedDate();
            const MdxMeta = {
                title: data.title,
                description: data.description,
                image: data.image,
                date: mdxDate
            };
            const mdxFrontMatter = generateMDXFrontmatter(MdxMeta);
            const author = 'ktroach'; // look at authors yaml
            const generateAuthors = `authors:\n\t- ${author}\n`;
            const mdxFileContent = `${mdxFrontMatter}${generateAuthors}\n${data.body}`;

            // generate a unique filename
            const generatedFilename = await generateUniqueFilename('.mdx');
            console.log('generatedFilename:', generatedFilename);
            const mdxContentPath: string = `./src/content/blog`;
            const mdxFileName: string  = `${mdxContentPath}/${generatedFilename}`;
            writeFileSync(mdxFileName, mdxFileContent); 

            spawnProcess("npm run contentlayer:build", []);

            // insert the blog data to the database -- this may not be needed using the contentlayer model 
            await db.insert(blogPosts).values({
                userId: user?.id,
                title: data.title,
                description: data.description,
                imageUrl: data.image,
                body: mdxFileContent,
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
