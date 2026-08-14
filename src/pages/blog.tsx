import { useEffect, useState } from "react";
import PostCard from "@/components/blog/PostCard";
import Layout from "@/components/layout/Layout";
import TopicButton from "@/components/blog/TopicButton";
import { Loader, ErrorBox, EmptyState } from "@/components/ui/Feedback";
import {
    collectCategories,
    mapNotionPost,
    matchesTopic,
    type BlogPostSummary,
    type NotionPage,
} from "@/utils/notionPost";

export default function Blog() {
    const [posts, setPosts] = useState<BlogPostSummary[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null
    );

    useEffect(() => {
        setIsLoading(true);
        fetch("/api/posts")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch posts");
                }
                return res.json();
            })
            .then((data: NotionPage[]) => {
                setPosts(data.map(mapNotionPost));
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching posts:", error);
                setError(error.message);
                setIsLoading(false);
            });
    }, []);

    // Tombol filter diambil dari properti Category di Notion.
    const categories = collectCategories(posts);

    const filteredPosts = selectedCategory
        ? posts.filter((post) => matchesTopic(post, selectedCategory))
        : posts;

    return (
        <Layout>
            <div className="mx-auto max-w-3xl">
                <div className="mb-10">
                    <span className="nb-label bg-nb-pink">Journal</span>
                    <h1 className="nb-heading mt-4 text-5xl sm:text-6xl">
                        Blog
                    </h1>

                    {categories.length > 0 && (
                        <div className="mt-6 flex flex-wrap gap-2">
                            <TopicButton
                                label="All"
                                isActive={selectedCategory === null}
                                onClick={() => setSelectedCategory(null)}
                            />
                            {categories.map((category) => (
                                <TopicButton
                                    key={category}
                                    label={category}
                                    isActive={selectedCategory === category}
                                    onClick={() =>
                                        setSelectedCategory(
                                            selectedCategory === category
                                                ? null
                                                : category
                                        )
                                    }
                                />
                            ))}
                        </div>
                    )}
                </div>

                {isLoading && <Loader label="Fetching posts" />}

                {error && <ErrorBox message={error} />}

                {!isLoading && !error && filteredPosts.length === 0 && (
                    <EmptyState message="No posts found." />
                )}

                <div className="space-y-8">
                    {filteredPosts.map((post) => (
                        <PostCard
                            key={post.id}
                            id={post.id}
                            title={post.title}
                            date={post.date}
                            description={post.description}
                            tags={post.labels}
                            image={post.image}
                        />
                    ))}
                </div>
            </div>
        </Layout>
    );
}
