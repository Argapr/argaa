import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { GetServerSideProps } from "next";
import Layout from "@/components/layout/Layout";
import { formatDate } from "@/utils/formatDate";
import { readingTimeFromHtml } from "@/utils/readingTime";
import { accentFor } from "@/utils/accent";
import { ErrorBox, EmptyState } from "@/components/ui/Feedback";
import { getBlogPost, getBlogPosts } from "@/lib/notion";
import {
    getPostCategory,
    getPostCover,
    getPostDate,
    getPostDescription,
    getPostTags,
    getPostTitle,
    type NotionPage,
} from "@/utils/notionPost";

type PostNav = {
    id: string;
    title: string;
} | null;

type Post = {
    id: string;
    title: string;
    date: string;
    description: string;
    category: string;
    tags: string[];
    cover: string;
    content: string;
    readingTime: number;
};

type PostProps = {
    post: Post | null;
    prev: PostNav;
    next: PostNav;
    error?: string;
};

export default function BlogPost({ post, prev, next, error }: PostProps) {
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
        <>
            <Head>
                <title>{`${post.title} — Blog Arga`}</title>
                {post.description && (
                    <meta name="description" content={post.description} />
                )}
            </Head>

            <Layout>
                <div className="mx-auto max-w-3xl">
                    {/* Baris atas: kembali + kategori */}
                    <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
                        <Link href="/blog" className="nb-btn">
                            ← Back to blog
                        </Link>

                        {post.category && (
                            <span
                                className={`nb-label ${accentFor(
                                    post.category,
                                )}`}
                            >
                                {post.category}
                            </span>
                        )}
                    </div>

                    <article>
                        <header>
                            <h1 className="nb-heading text-4xl sm:text-5xl md:text-6xl">
                                {post.title}
                            </h1>

                            {/* Meta: penulis, tanggal, estimasi waktu baca */}
                            <div className="mt-6 flex flex-wrap items-center gap-3 border-y-3 border-nb-border py-3">
                                <div className="h-9 w-9 shrink-0 overflow-hidden border-3 border-nb-border">
                                    <Image
                                        src="/images/avatar.jpeg"
                                        alt="Arga Pratama"
                                        width={36}
                                        height={36}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <span className="font-bold uppercase tracking-wide">
                                    Arga Pratama
                                </span>
                                <span className="border-2 border-nb-border px-2 py-0.5 font-mono text-xs font-bold text-nb-muted">
                                    {post.date}
                                </span>
                                <span className="border-2 border-nb-border px-2 py-0.5 font-mono text-xs font-bold text-nb-muted">
                                    {post.readingTime} min read
                                </span>
                            </div>
                        </header>

                        {post.cover && (
                            <div className="relative mt-8 aspect-[16/9] overflow-hidden border-3 border-nb-border bg-nb-surface shadow-nb-lg">
                                <Image
                                    src={post.cover}
                                    alt={post.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 768px"
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        )}

                        <div
                            className="prose mt-10 max-w-none text-nb-ink dark:prose-invert lg:prose-lg"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {post.tags.length > 0 && (
                            <div className="mt-12 border-t-3 border-nb-border pt-6">
                                <span className="font-display text-xs uppercase tracking-widest text-nb-muted">
                                    Tags
                                </span>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {post.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className={`nb-tag ${accentFor(
                                                tag,
                                            )}`}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </article>

                    {/* Navigasi antar post */}
                    {(prev || next) && (
                        <nav className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {prev ? (
                                <Link
                                    href={`/blog/${prev.id}`}
                                    className="nb-card nb-card-hover p-4"
                                >
                                    <span className="font-display text-xs uppercase tracking-widest text-nb-muted">
                                        ← Previous
                                    </span>
                                    <p className="mt-2 line-clamp-2 font-bold">
                                        {prev.title}
                                    </p>
                                </Link>
                            ) : (
                                <span />
                            )}

                            {next && (
                                <Link
                                    href={`/blog/${next.id}`}
                                    className="nb-card nb-card-hover p-4 sm:text-right"
                                >
                                    <span className="font-display text-xs uppercase tracking-widest text-nb-muted">
                                        Next →
                                    </span>
                                    <p className="mt-2 line-clamp-2 font-bold">
                                        {next.title}
                                    </p>
                                </Link>
                            )}
                        </nav>
                    )}

                    {/* Kartu penulis */}
                    <aside className="mt-10 border-3 border-black bg-nb-yellow p-6 text-black shadow-ink-lg">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                            <div className="h-16 w-16 shrink-0 overflow-hidden border-3 border-black">
                                <Image
                                    src="/images/avatar.jpeg"
                                    alt="Arga Pratama"
                                    width={64}
                                    height={64}
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            <div>
                                <p className="font-display text-xl uppercase tracking-tight">
                                    Arga Pratama
                                </p>
                                <p className="mt-2 text-sm font-medium">
                                    Full Stack Developer crafting seamless
                                    digital experiences, end to end.
                                </p>
                                <a
                                    href="https://github.com/Argapr"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="nb-btn-accent mt-4 bg-nb-surface"
                                >
                                    Follow on GitHub
                                </a>
                            </div>
                        </div>
                    </aside>
                </div>
            </Layout>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params as { id: string };

    try {
        const [data, all] = await Promise.all([
            getBlogPost(id),
            getBlogPosts(),
        ]);

        const content =
            data.content ||
            getPostDescription(data.properties) ||
            "<p>No content available.</p>";

        const rawDate = getPostDate(data.properties);

        const post: Post = {
            id: data.id,
            title: getPostTitle(data.properties),
            date: rawDate ? formatDate(rawDate) : "No date",
            description: getPostDescription(data.properties),
            category: getPostCategory(data.properties),
            tags: getPostTags(data.properties),
            cover: getPostCover(data.properties),
            content,
            readingTime: readingTimeFromHtml(content),
        };

        // Urut dari yang terbaru, lalu ambil tetangga post ini untuk navigasi.
        const sorted = (all as NotionPage[])
            .map((page) => ({
                id: page.id,
                title: getPostTitle(page.properties),
                date: getPostDate(page.properties),
            }))
            .sort((a, b) => b.date.localeCompare(a.date));

        const index = sorted.findIndex((item) => item.id === data.id);
        const newer = index > 0 ? sorted[index - 1] : null;
        const older =
            index >= 0 && index < sorted.length - 1 ? sorted[index + 1] : null;

        return {
            props: {
                post,
                prev: older ? { id: older.id, title: older.title } : null,
                next: newer ? { id: newer.id, title: newer.title } : null,
            },
        };
    } catch (error) {
        console.error("Error fetching post:", error);
        return {
            props: {
                post: null,
                prev: null,
                next: null,
                error: "Failed to load blog post. Please try again later.",
            },
        };
    }
};
