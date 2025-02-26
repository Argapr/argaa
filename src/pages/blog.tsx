import { useEffect, useState } from "react";
import PostCard from "@/components/blog/PostCard";
import Layout from "@/components/layout/Layout";

type Post = {
    id: string;
    title: string;
    date: string;
    description: string;
    tags: string[];
    image: string;
};

type NotionPost = {
    id: string;
    properties: {
        Name?: { title: { text: { content: string } }[] };
        Date?: { date?: { start: string } };
        description?: { rich_text: { text: { content: string } }[] };
        "Multi-select"?: { multi_select: { name: string }[] };
        "Files & media"?: { files: { file?: { url: string } }[] };
    };
};

export default function Home() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true);
        fetch("/api/posts")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch posts");
                }
                return res.json();
            })
            .then((data: NotionPost[]) => {
                const formattedPosts: Post[] = data.map((post) => ({
                    id: post.id,
                    title:
                        post.properties?.Name?.title?.[0]?.text?.content ||
                        "Untitled",
                    date: post.properties?.Date?.date?.start
                        ? new Date(
                              post.properties.Date.date.start
                          ).toLocaleDateString("id-ID", {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                          })
                        : "No date",
                    description:
                        post.properties?.description?.rich_text?.[0]?.text
                            ?.content || "No description available.",
                    tags:
                        post.properties?.["Multi-select"]?.multi_select?.map(
                            (tag) => tag.name
                        ) || [],
                    image:
                        post.properties?.["Files & media"]?.files?.[0]?.file
                            ?.url || "",
                }));

                setPosts(formattedPosts);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching posts:", error);
                setError(error.message);
                setIsLoading(false);
            });
    }, []);

    return (
        <Layout>
            <div className="max-w-3xl mx-auto">
                {isLoading && (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 p-4 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                {!isLoading && !error && posts.length === 0 && (
                    <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                        No posts found.
                    </div>
                )}

                <div className="space-y-8">
                    {posts.map((post) => (
                        <PostCard
                            key={post.id}
                            id={post.id}
                            title={post.title}
                            date={post.date}
                            description={post.description}
                            tags={post.tags}
                            image={post.image}
                        />
                    ))}
                </div>
            </div>
        </Layout>
    );
}
