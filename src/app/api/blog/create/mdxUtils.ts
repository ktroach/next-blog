// mdxUtils generates the frontmatter section 

export const generateMDXFrontmatter = (metadata: Record<string, unknown>, author: string): string => {
    // metadata is of type object and here we are extracting the properties and joining them into a string
    let frontmatterYAML = Object.entries(metadata)
        .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
        .join('\n');

    // if there are authors listed, append the authors to the frontmatter section 
    if (author && author.length > 0) {
        // create the authors section 
        const frontmatterAuthor = `authors:\n  - ${author}`;
        if (frontmatterYAML) {
            frontmatterYAML = `${frontmatterYAML}\n${frontmatterAuthor}`; 
        }
    }
    // return the YAML for the frontmatter section 
    return `---\n${frontmatterYAML}\n---\n`;
};

export const generateAuthorFrontmatter = (metadata: Record<string, unknown>) => {
    // metadata is of type object and here we are extracting the properties and joining them into a string
    const frontmatterYAML = Object.entries(metadata)
        .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
        .join('\n');
    // return the YAML for the frontmatter section 
    return `---\n${frontmatterYAML}\n---\n`;    
}; 