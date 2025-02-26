// src/components/project/ProjectCard.tsx
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/hooks/useTheme";

interface ProjectCardProps {
    title: string;
    description: string;
    image: string;
    tools: string[];
    githubUrl: string;
}

const ProjectCard = ({
    title,
    description,
    image,
    tools,
    githubUrl,
}: ProjectCardProps) => {
    const { isDark } = useTheme();

    return (
        <div
            className={`rounded-lg overflow-hidden shadow-md ${
                isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
            } transition-all hover:shadow-xl transform hover:-translate-y-1 duration-300`}
        >
            <div className="relative h-48 w-full group">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
            </div>
            <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold">{title}</h3>
                    <Link
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-full ${
                            isDark
                                ? "bg-gray-700 hover:bg-gray-600 text-white"
                                : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                        } transition-colors`}
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
                <p
                    className={`mb-4 ${
                        isDark ? "text-gray-300" : "text-gray-600"
                    }`}
                >
                    {description}
                </p>
                <div className="flex flex-wrap gap-2">
                    {tools.map((tool, index) => (
                        <span
                            key={index}
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                                isDark
                                    ? "bg-gray-700 text-green-400"
                                    : "bg-green-100 text-green-800"
                            } transition-colors hover:scale-105 transform duration-200`}
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
