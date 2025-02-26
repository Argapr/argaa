import { useEffect, useState } from "react";
import PostCard from "@/components/blog/PostCard";
import Layout from "@/components/layout/Layout";
import TopicsList from "@/components/blog/TopicsList";

type Post = {
    id: string;
    title: string;
    date: string;
    description: string;
    tags: string[];
    image: string;
};

export default function Home() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
    const [topics, setTopics] = useState<string[]>([]);

    useEffect(() => {
        setIsLoading(true);
        fetch("/api/posts")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch posts");
                }
                return res.json();
            })
            .then((data) => {
                console.log("Fetched Data:", data);
                const formattedPosts = data.map((post: any) => ({
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
                            (tag: any) => tag.name
                        ) || [],
                    image:
                        post.properties?.["Files & media"]?.files?.[0]?.file
                            ?.url || "",
                }));

                // Extract all unique topics from posts
                const allTopics = new Set<string>();
                formattedPosts.forEach((post: Post) => {
                    post.tags.forEach((tag: string) => allTopics.add(tag));
                });
                setTopics(Array.from(allTopics));
                setPosts(formattedPosts);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching posts:", error);
                setError(error.message);
                setIsLoading(false);
            });
    }, []);

    // Filter posts based on selected topic
    const filteredPosts = selectedTopic
        ? posts.filter((post) => post.tags.includes(selectedTopic))
        : posts;

    return (
        <Layout>
            <h1 className="text-center mb-5 text-3xl font-bold">Arga Pratama</h1>
            <p className="text-center mb-20 text-md">
                Frontend Engineer crafting user-centric web experiences. Writing
                about <br /> React, TypeScript, and modern web development.
            </p>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

                {!isLoading && !error && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left column - Posts */}
                        <div className="lg:col-span-2">
                            {selectedTopic && (
                                <div className="mb-6">
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                        Posts tagged with: {selectedTopic}
                                    </h2>
                                    <button
                                        onClick={() => setSelectedTopic(null)}
                                        className="text-green-600 dark:text-green-400 hover:underline"
                                    >
                                        Show all posts
                                    </button>
                                </div>
                            )}

                            {filteredPosts.length === 0 ? (
                                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                                    No posts found.
                                </div>
                            ) : (
                                <div className="space-y-8">
                                    {filteredPosts.slice(0, 2).map((post) => (
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
                            )}
                        </div>

                        {/* Right column - Featured Projects & Topics */}
                        <div className="space-y-8">
                            <TopicsList
                                topics={topics}
                                selectedTopic={selectedTopic}
                                onSelectTopic={setSelectedTopic}
                            />
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}
