import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { remark } from "remark";
import html from "remark-html";
import dotenv from "dotenv";
import type { NotionPage } from "@/utils/notionPost";

dotenv.config();

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export type BlogPostPage = NotionPage & {
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
