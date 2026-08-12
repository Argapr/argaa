import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { remark } from "remark";
import html from "remark-html";
import dotenv from "dotenv";

dotenv.config();

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export type BlogPostPage = {
    id: string;
    properties?: {
        Name?: { title?: { text?: { content?: string } }[] };
        Date?: { date?: { start?: string } | null };
        description?: { rich_text?: { text?: { content?: string } }[] };
        "Multi-select"?: { multi_select?: { name: string }[] };
    };
    content: string;
};

export const getBlogPosts = async () => {
    try {
        const response = await notion.databases.query({
            database_id: process.env.NOTION_DATABASE_ID!,
        });

        return response.results;
    } catch (error) {
        console.error("Error fetching data from Notion:", error);
        return [];
    }
};

export const getBlogPost = async (id: string): Promise<BlogPostPage> => {
    const page = await notion.pages.retrieve({ page_id: id });

    const n2m = new NotionToMarkdown({ notionClient: notion });
    const mdBlocks = await n2m.pageToMarkdown(id);
    const mdString = n2m.toMarkdownString(mdBlocks).parent;

    const processedContent = await remark().use(html).process(mdString);

    return {
        ...(page as unknown as BlogPostPage),
        content: processedContent.toString(),
    };
};
