import type { NextApiRequest, NextApiResponse } from "next";
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { remark } from "remark";
import html from "remark-html";

const notion = new Client({
    auth: process.env.NOTION_API_KEY,
});

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query;

    if (!id || typeof id !== "string") {
        return res.status(400).json({ error: "Post ID is required" });
    }

    try {
        // Get the page
        const page = await notion.pages.retrieve({ page_id: id });

        // Get page content
        const n2m = new NotionToMarkdown({ notionClient: notion });
        const mdBlocks = await n2m.pageToMarkdown(id);
        const mdString = n2m.toMarkdownString(mdBlocks).parent;

        // Convert markdown to HTML
        const processedContent = await remark().use(html).process(mdString);
        const contentHtml = processedContent.toString();

        // Return both page and content
        return res.status(200).json({
            ...page,
            content: contentHtml,
        });
    } catch (error) {
        console.error("Error fetching post:", error);
        console.log("Using Notion API Key:", process.env.NOTION_API_KEY);
        return res.status(500).json({ error: "Failed to fetch post" });
    }
}
