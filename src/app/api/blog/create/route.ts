import { db } from "@/db"
import { blogPosts } from "@/db/schema"
import { eq, and } from 'drizzle-orm';
import { currentUser } from "@clerk/nextjs"
import { z } from "zod"
import { blogSchema } from "@/lib/validations/blog"
import { writeFileSync, existsSync } from "fs"
import { generateUniqueFilename } from './fileUtils';
import { generateMDXDate } from './dateUtils';
import { 
    generateMDXFrontmatter, 
    generateAuthorFrontmatter, 
} from "./mdxUtils"; 

export async function POST(req: Request) {
    console.log(">>> ENTERED: POST Blog route"); 
    const data = blogSchema.parse(await req.json());
    console.log(">>> data >>>> ", data);

    try {
        const user = await currentUser();

        if (!user) {
            console.log(">>> Current user not found >>> ");
            return new Response(null, { status: 404 });            
        }

        const userId = user?.id ? user.id : undefined; 
        const userName = user?.username ? user.username : ""; 
        console.log(">>> userId >>> ", userId); 
        console.log(">>> userName >>> ", userName); 

        // set the default user avatar to the imageUrl from Clerk 
        let userAvatar = user?.imageUrl ? user.imageUrl : "";
        // but, if the user is logged in using an external account, use the avatar from the external account, if it exists
        const hasExternalAccounts = user?.externalAccounts && user?.externalAccounts?.length > 0 ? true : false; 
        const externalAccounts = hasExternalAccounts ? user.externalAccounts : undefined; 
        if (externalAccounts) {
            for (let i = 0; i < externalAccounts.length; i++) {
                const externalAccount = externalAccounts[i]; 
                const hasExternalImage = externalAccount?.imageUrl ? true : false; 
                userAvatar = externalAccount && hasExternalImage ? externalAccount.imageUrl : userAvatar; 
            }
        }

        console.log('>>> userAvatar: ', userAvatar);
        // one more possible avatar that would override the previous options 
        // if (user?.profileImageUrl) {
        //     if (user.profileImageUrl.length > 0) {
        //         userAvatar = user.profileImageUrl; 
        //     }
        // }

        // if we don't have a userId, we should probably exit out of this method. only create a blog post if it is a valid user.  
        if (!userId) {
            console.log(">>> userId not found >>> ");
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
            console.log(">>> A blog post with this title already exists >>> ", existingBlogPost);
            return new Response(null, { status: 204 });
        }

        // write the MDX file to the server 
        
        // TODO: if no data.image is specified, create an image and store it on the cdn... 
        
        // If the author mdx file does not exist, create it 
        const authorMeta = {
            title: userName, 
            avatar: userAvatar, 
            twitter: "", 
        }; 
        const mdxAuthorContent = generateAuthorFrontmatter(authorMeta); 
        console.log('>>> mdxAuthorContent: ', mdxAuthorContent);
        const mdxAuthorsPath: string = `./src/content/authors`;
        console.log('>>> mdxAuthorsPath: ', mdxAuthorsPath);
        const mdxAuthorFileName: string = `${mdxAuthorsPath}/${userName}.mdx`;
        if (!existsSync(mdxAuthorFileName)) {
            console.log('>>> Writing Author File: ', mdxAuthorFileName);
            writeFileSync(mdxAuthorFileName, mdxAuthorContent);         
        } else {
            console.log(">>> Author file already exists...skipping write author file: ", mdxAuthorFileName); 
        }      

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
        
        const mdxBlogPath: string = `./src/content/blog`;
        const mdxFileName: string  = `${mdxBlogPath}/${generatedFilename}`;
        
        console.log('>>> Writing Blog File: ', mdxFileName);
        writeFileSync(mdxFileName, mdxFileContent); 

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
