import { useEffect, useState } from "react";
import Link from "next/link";
import PostCard from "@/components/blog/PostCard";
import Layout from "@/components/layout/Layout";
import TopicsList from "@/components/blog/TopicsList";
import { Loader, ErrorBox, EmptyState } from "@/components/ui/Feedback";

type Post = {
    id: string;
    title: string;
    date: string;
    description: string;
    tags: string[];
    image: string;
};

type RawPost = {
    id: string;
    properties: {
        Name?: {
            title: { text: { content: string } }[];
        };
        Date?: {
            date?: { start: string };
        };
        description?: {
            rich_text: { text: { content: string } }[];
        };
        "Multi-select"?: {
            multi_select: { name: string }[];
        };
        "Files & media"?: {
            files: { file: { url: string } }[];
        };
    };
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
            .then((data: RawPost[]) => {
                console.log("Fetched Data:", data);

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

                // Extract all unique topics from posts
                const allTopics = new Set<string>();
                formattedPosts.forEach((post) => {
                    post.tags.forEach((tag) => allTopics.add(tag));
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
            {/* Hero */}
            <section className="mb-16 border-3 border-nb-border bg-nb-surface p-6 shadow-nb-lg sm:p-10">
                <span className="nb-label bg-nb-lime">Web Developer</span>

                <h1 className="nb-heading mt-5 text-5xl sm:text-7xl">
                    Arga
                    <br />
                    <span className="bg-nb-yellow px-2 text-black">
                        Pratama
                    </span>
                </h1>

                <p className="mt-6 max-w-xl text-lg text-nb-muted">
                    Crafting user-centric web experiences. Writing about REST
                    API, Laravel, Next.js, and React.js.
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
                                            tags={post.tags}
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
