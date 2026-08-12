import Link from "next/link";
import { GetServerSideProps } from "next";
import Layout from "@/components/layout/Layout";
import { formatDate } from "@/utils/formatDate";
import { accentFor } from "@/utils/accent";
import { ErrorBox, EmptyState } from "@/components/ui/Feedback";
import { getBlogPost } from "@/lib/notion";

type Tag = {
    name: string;
};

type PostProps = {
    post: {
        id: string;
        title: string;
        date: string;
        description: string;
        tags: string[];
    } | null;
    error?: string;
};

export default function BlogPost({ post, error }: PostProps) {
    if (error) {
        return (
            <Layout>
                <div className="mx-auto max-w-3xl">
                    <ErrorBox message={error} />
                </div>
            </Layout>
        );
    }

    if (!post) {
        return (
            <Layout>
                <div className="mx-auto max-w-3xl">
                    <EmptyState message="Post not found." />
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <article className="mx-auto max-w-3xl">
                <Link href="/blog" className="nb-btn mb-8">
                    ← Back to blog
                </Link>

                <header className="mb-10 border-3 border-nb-border bg-nb-surface p-6 shadow-nb-lg">
                    <h1 className="nb-heading text-3xl md:text-4xl">
                        {post.title}
                    </h1>
                    <p className="mt-3 inline-block border-2 border-nb-border px-2 py-0.5 font-mono text-xs font-bold text-nb-muted">
                        {post.date}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className={`nb-tag ${accentFor(tag)}`}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </header>

                <div
                    className="prose max-w-none text-nb-ink dark:prose-invert lg:prose-lg"
                    dangerouslySetInnerHTML={{ __html: post.description }}
                />
            </article>
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params as { id: string };

    try {
        const data = await getBlogPost(id);

        const post = {
            id: data.id,
            title:
                data.properties?.Name?.title?.[0]?.text?.content || "Untitled",
            date: data.properties?.Date?.date?.start
                ? formatDate(data.properties.Date.date.start)
                : "No date",
            description:
                data.content ||
                data.properties?.description?.rich_text?.[0]?.text?.content ||
                "<p>No content available.</p>",
            tags:
                data.properties?.["Multi-select"]?.multi_select?.map(
                    (tag: Tag) => tag.name
                ) || [],
        };

        return {
            props: { post },
        };
    } catch (error) {
        console.error("Error fetching post:", error);
        return {
            props: {
                post: null,
                error: "Failed to load blog post. Please try again later.",
            },
        };
    }
};
