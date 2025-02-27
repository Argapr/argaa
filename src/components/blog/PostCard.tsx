import Link from "next/link";
import Image from "next/image";

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
        <article className="overflow-hidden border-b pb-6 mb-6 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-8">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 mr-3 overflow-hidden">
                            <Image
                                src="/images/avatar.jpeg"
                                alt="Author"
                                width={32}
                                height={32}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "/default-avatar.jpg";
                                }}
                            />
                        </div>
                        <span className="font-medium mr-3">Arga Pratama</span>
                        <span className="text-green-600 dark:text-green-400">
                            •
                        </span>
                        <span className="ml-3">{date}</span>
                    </div>

                    <div className="mb-3">
                        <Link href={`/blog/${id}`}>
                            <h2 className="text-2xl sm:text-3xl font-bold text-black dark:text-white hover:text-green-600 dark:hover:text-green-400 transition-colors">
                                {title}
                            </h2>
                        </Link>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {description}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 text-sm font-semibold bg-green-600 text-white rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="md:col-span-4">
                    <Link href={`/blog/${id}`}>
                        <div className="rounded-lg overflow-hidden h-48 md:h-40 bg-gray-100 dark:bg-gray-700 relative">
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
