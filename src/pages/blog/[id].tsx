import { GetServerSideProps } from "next";
import Layout from "@/components/layout/Layout";
import { formatDate } from "@/utils/formatDate";

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
                <div className="max-w-3xl mx-auto">
                    <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 p-4 rounded-lg mb-6">
                        {error}
                    </div>
                </div>
            </Layout>
        );
    }

    if (!post) {
        return (
            <Layout>
                <div className="max-w-3xl mx-auto">
                    <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                        Post not found.
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <article className="max-w-3xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        {post.title}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        {post.date}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 text-sm font-semibold bg-green-600 text-white rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </header>

                <div
                    className="prose dark:prose-invert lg:prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.description }}
                />
            </article>
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params as { id: string };

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/posts/${id}`
        );

        if (!res.ok) {
            throw new Error("Failed to fetch post");
        }

        const data = await res.json();

        const post = {
            id: data.id,
            title:
                data.properties?.Name?.title?.[0]?.text?.content || "Untitled",
            date: data.properties?.Date?.date?.start
                ? formatDate(data.properties.Date.date.start)
                : "No date",
            description:
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
