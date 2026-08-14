import { useEffect, useState } from "react";
import Link from "next/link";
import PostCard from "@/components/blog/PostCard";
import Layout from "@/components/layout/Layout";
import TopicsList from "@/components/blog/TopicsList";
import { Loader, ErrorBox, EmptyState } from "@/components/ui/Feedback";
import {
    collectCategories,
    mapNotionPost,
    matchesTopic,
    type BlogPostSummary,
    type NotionPage,
} from "@/utils/notionPost";

export default function Home() {
    const [posts, setPosts] = useState<BlogPostSummary[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

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

    // Topics diambil dari properti Category di Notion.
    const topics = collectCategories(posts);

    const filteredPosts = selectedTopic
        ? posts.filter((post) => matchesTopic(post, selectedTopic))
        : posts;

    return (
        <Layout>
            {/* Hero */}
            <section className="mb-16 border-3 border-nb-border bg-nb-surface p-6 shadow-nb-lg sm:p-10">
                <span className="nb-label bg-nb-lime">
                    Full Stack Developer
                </span>

                <h1 className="nb-heading mt-5 text-5xl sm:text-7xl">
                    Arga
                    <br />
                    <span className="bg-nb-yellow px-2 text-black">
                        Pratama
                    </span>
                </h1>

                <p className="mt-6 max-w-xl text-lg text-nb-muted">
                    Full Stack Developer crafting seamless digital experiences,
                    end to end.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                    <Link href="/about" className="nb-btn-accent bg-nb-blue">
                        About me
                    </Link>
                    <Link href="/project" className="nb-btn">
                        See projects
                    </Link>
                </div>
            </section>

            <div>
                {isLoading && <Loader label="Fetching posts" />}

                {error && <ErrorBox message={error} />}

                {!isLoading && !error && (
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {/* Left column - Posts */}
                        <div className="lg:col-span-2">
                            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                                <h2 className="nb-heading text-2xl">
                                    {selectedTopic
                                        ? `# ${selectedTopic}`
                                        : "Latest posts"}
                                </h2>
                                {selectedTopic && (
                                    <button
                                        onClick={() => setSelectedTopic(null)}
                                        className="nb-btn"
                                    >
                                        Show all
                                    </button>
                                )}
                            </div>

                            {filteredPosts.length === 0 ? (
                                <EmptyState message="No posts found." />
                            ) : (
                                <div className="space-y-8">
                                    {filteredPosts.slice(0, 2).map((post) => (
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
                            )}
                        </div>

                        {/* Right column - Featured Projects & Topics */}
                        <div className="space-y-8 lg:sticky lg:top-32 lg:self-start">
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
