export const generateMDXFrontmatter = (metadata: Record<string, any>): string => {
    const frontmatterYAML = Object.entries(metadata)
        .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
        .join('\n');
    const frontmatter = `---\n${frontmatterYAML}\n---\n`;
    return frontmatter;
};