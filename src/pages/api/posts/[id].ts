import type { NextApiRequest, NextApiResponse } from "next";
import { getBlogPost } from "@/lib/notion";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query;

    if (!id || typeof id !== "string") {
        return res.status(400).json({ error: "Post ID is required" });
    }

    try {
        const post = await getBlogPost(id);
        return res.status(200).json(post);
    } catch (error) {
        console.error("Error fetching post:", error);
        return res.status(500).json({ error: "Failed to fetch post" });
    }
}
