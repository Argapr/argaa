import { Client } from "@notionhq/client";
import dotenv from "dotenv";

dotenv.config();

const notion = new Client({ auth: process.env.NOTION_API_KEY });

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
