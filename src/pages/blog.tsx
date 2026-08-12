import { useEffect, useState } from "react";
import PostCard from "@/components/blog/PostCard";
import Layout from "@/components/layout/Layout";
import { Loader, ErrorBox, EmptyState } from "@/components/ui/Feedback";

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
            <div className="mx-auto max-w-3xl">
                <div className="mb-10">
                    <span className="nb-label bg-nb-pink">Journal</span>
                    <h1 className="nb-heading mt-4 text-5xl sm:text-6xl">
                        Blog
                    </h1>
                    {/* <p className="mt-4 text-nb-muted">
                        Catatan seputar REST API, Laravel, Next.js, dan
                        React.js.
                    </p> */}
                </div>

                {isLoading && <Loader label="Fetching posts" />}

                {error && <ErrorBox message={error} />}

                {!isLoading && !error && posts.length === 0 && (
                    <EmptyState message="No posts found." />
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
