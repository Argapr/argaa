import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/hooks/useTheme";

interface ProjectCardProps {
    id: number;
    title: string;
    description: string;
    image: string;
    tools: string[];
    githubUrl: string;
    isFeatured?: boolean;
}

const ProjectCard = ({
    id,
    title,
    description,
    image,
    tools,
    githubUrl,
    isFeatured = false,
}: ProjectCardProps) => {
    const { isDark } = useTheme();

    if (isFeatured) {
        return (
            <div
                className={`relative h-96 w-full rounded-xl overflow-hidden group shadow-xl ${
                    isDark ? "border border-gray-700" : "border border-gray-200"
                }`}
            >
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                <div className="absolute bottom-0 left-0 p-6 w-full">
                    <div className="flex justify-between items-start mb-3">
                        <h3 className="text-2xl font-bold text-white">
                            {title}
                        </h3>
                        <Link
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                            aria-label="View on GitHub"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-github"
                            >
                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                            </svg>
                        </Link>
                    </div>
                    <p className="text-gray-200 mb-4">{description}</p>
                    <div className="flex flex-wrap gap-2">
                        {tools.map((tool, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 rounded-full text-sm font-medium bg-white/10 text-white"
                            >
                                {tool}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`relative h-64 rounded-xl overflow-hidden group ${
                isDark
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-white border border-gray-200"
            } shadow-lg transition-all duration-300 hover:shadow-xl`}
        >
            <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-all duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

            <div className="absolute bottom-0 left-0 p-5 w-full">
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-white">{title}</h3>
                    {id !== 2 && id !== 4 && id !== 9 && (
                        <Link
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                            aria-label="View on GitHub"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-github"
                            >
                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                            </svg>
                        </Link>
                    )}
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                    {tools.slice(0, 3).map((tool, index) => (
                        <span
                            key={index}
                            className="px-2 py-1 rounded-full text-xs font-medium bg-white/10 text-white"
                        >
                            {tool}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
