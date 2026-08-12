import Link from "next/link";
import Image from "next/image";
import { accentFor } from "@/utils/accent";

type PostCardProps = {
    id: string;
    title: string;
    date: string;
    description: string;
    tags: string[];
    image: string;
};

export default function PostCard({
    id,
    title,
    date,
    description,
    tags,
    image,
}: PostCardProps) {
    return (
        <article className="nb-card nb-card-hover p-5 sm:p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
                <div className="md:col-span-8">
                    <div className="mb-4 flex flex-wrap items-center gap-3 text-sm">
                        <div className="h-9 w-9 shrink-0 overflow-hidden border-3 border-nb-border">
                            <Image
                                src="/images/avatar.jpeg"
                                alt="Author"
                                width={36}
                                height={36}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "/default-avatar.jpg";
                                }}
                            />
                        </div>
                        <span className="font-bold uppercase tracking-wide text-nb-ink">
                            Arga Pratama
                        </span>
                        <span className="border-2 border-nb-border px-2 py-0.5 font-mono text-xs font-bold text-nb-muted">
                            {date}
                        </span>
                    </div>

                    <Link href={`/blog/${id}`} className="group">
                        <h2 className="nb-heading mb-3 text-2xl transition-colors sm:text-3xl group-hover:text-nb-pink">
                            {title}
                        </h2>
                    </Link>

                    <p className="mb-4 line-clamp-2 text-nb-muted">
                        {description}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className={`nb-tag ${accentFor(tag)}`}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="md:col-span-4">
                    <Link href={`/blog/${id}`}>
                        <div className="relative h-48 overflow-hidden border-3 border-nb-border bg-nb-surface md:h-40">
                            <Image
                                src={
                                    image && image.startsWith("http")
                                        ? image
                                        : "/images/default-placeholder.jpg"
                                }
                                alt={title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </Link>
                </div>
            </div>
        </article>
    );
}
