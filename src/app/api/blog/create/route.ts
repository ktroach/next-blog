import { db } from "@/db"
import { blogPosts } from "@/db/schema"
import { eq, and } from 'drizzle-orm';
import { currentUser } from "@clerk/nextjs"
import { z } from "zod"
import { blogSchema } from "@/lib/validations/blog"
import { writeFileSync } from "fs"
import { generateUniqueFilename } from './fileUtils';
import { generateMDXDate } from './dateUtils';
import { generateMDXFrontmatter } from "./mdxUtils"
import { spawnProcess } from "./processUtils"

export async function POST(req: Request) {
    console.log(">>> ENTERED: POST Blog route"); 
    const data = blogSchema.parse(await req.json());
    console.log(">>> data >>>> ", data);

    try {
        const user = await currentUser();
        const userId = user && user?.id ? user.id : undefined; 
        const userName = user && user?.username ? user.username : ""; 
        console.log(">>> userId >>> ", userId); 
        console.log(">>> userName >>> ", userName); 

        // if we don't have a userId, we should probably exit out of this method. only create a blog post if it is a valid user.  
        if (!userId) {
            console.log(">>> userId does not exist >>> ");
            return new Response(null, { status: 404 });            
        }

        const existingBlogPost = await db.select().from(blogPosts).where(
            and(
              eq(blogPosts.title, data.title),
              eq(blogPosts.userId, userId)
            )
        );

        console.log(">>> existingBlogPost >>> ", existingBlogPost); 

        if (existingBlogPost.length > 0) {
            console.log(">>> Blog post already exists >>> ", existingBlogPost);
            return new Response(null, { status: 204 });
        }

        // write the MDX file to the server 
        
        // TODO: if no data.image is specified, create an image and store it on the cdn... 

        // TODO: If the author mdx file does not exist, create it 
        

        const mdxDate = generateMDXDate();

        const MdxMeta = {
            title: data.title,
            description: data.description,
            image: data.image,
            date: mdxDate
        };

        const mdxFrontMatter = generateMDXFrontmatter(MdxMeta, userName);
        const mdxFileContent = `${mdxFrontMatter}\n${data.body}`;

        // generate a unique filename
        const generatedFilename = generateUniqueFilename('.mdx');
        console.log('generatedFilename:', generatedFilename);
        
        const mdxContentPath: string = `./src/content/blog`;
        const mdxFileName: string  = `${mdxContentPath}/${generatedFilename}`;
        
        writeFileSync(mdxFileName, mdxFileContent); 

        console.log(">>> Building ContentLayer Files... "); 

        await spawnProcess("npm run contentlayer:build", []); 
        
        console.log(">>> ContentLayer Build Complete."); 

        // insert the blog data to the database
        await db.insert(blogPosts).values({
            userId: userId,
            title: data.title,
            description: data.description,
            imageUrl: data.image,
            body: mdxFileContent,
            createdAt: new Date(),
        });

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
